import { NextResponse } from "next/server"
import { createPool } from "@vercel/postgres"
import { loadEnvConfig } from "@next/env"
import { Resend } from "resend"
import { existsSync, readFileSync } from "node:fs"
import path from "node:path"

export const runtime = "nodejs"

type SignatureRow = {
  id: number
  name: string
  email: string
  country: string | null
  created_at: Date
}

let tableReady = false
let pool: ReturnType<typeof createPool> | null = null

function loadLocalEnvFallback() {
  if (!process.env.POSTGRES_URL) {
    loadEnvConfig(process.cwd())
  }

  const envFilePath = path.join(process.cwd(), ".env.local")
  if (!existsSync(envFilePath)) return

  // Extra fallback for local Windows encoding edge cases.
  const raw = readFileSync(envFilePath)
  const content = raw.includes(0) ? raw.toString("utf16le") : raw.toString("utf8")

  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue
    const separatorIndex = trimmed.indexOf("=")
    if (separatorIndex < 1) continue

    const key = trimmed.slice(0, separatorIndex).trim()
    const value = trimmed.slice(separatorIndex + 1).trim()
    if (key && !process.env[key]) {
      process.env[key] = value
    }
  }
}

function requirePool() {
  if (pool) return pool

  loadLocalEnvFallback()

  const connectionString =
    process.env.POSTGRES_URL ?? process.env.POSTGRES_PRISMA_URL ?? process.env.DATABASE_URL

  if (!connectionString) {
    throw new Error(
      "POSTGRES_URL is missing. Add your Postgres connection string to env vars."
    )
  }

  pool = createPool({ connectionString })

  return pool
}

async function ensureTable() {
  const db = requirePool()

  if (tableReady) return

  try {
    await db.sql`
      CREATE SEQUENCE IF NOT EXISTS petition_signatures_id_seq
    `

    await db.sql`
      CREATE TABLE IF NOT EXISTS petition_signatures (
        id INTEGER PRIMARY KEY DEFAULT nextval('petition_signatures_id_seq'),
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        country TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `

    await db.sql`
      CREATE INDEX IF NOT EXISTS petition_signatures_created_at_idx
      ON petition_signatures (created_at DESC)
    `
  } catch (error) {
    // Harmless race during parallel cold starts on CREATE statements.
    if (
      !(error instanceof Error) ||
      !("message" in error) ||
      typeof error.message !== "string" ||
      !error.message.includes("already exists")
    ) {
      throw error
    }
  }

  tableReady = true
}

function mapSignature(row: SignatureRow) {
  return {
    id: row.id,
    name: row.name,
    country: row.country,
    createdAt: row.created_at.toISOString(),
  }
}

export async function GET(request: Request) {
  try {
    await ensureTable()
    const db = requirePool()

    const { searchParams } = new URL(request.url)
    const parsedLimit = Number(searchParams.get("limit") ?? "5")
    const limit = Number.isFinite(parsedLimit)
      ? Math.max(1, Math.min(Math.floor(parsedLimit), 25))
      : 5

    const [totalResult, latestResult] = await Promise.all([
      db.sql<{ count: string }>`SELECT COUNT(*)::text AS count FROM petition_signatures`,
      db.sql<SignatureRow>`
        SELECT id, name, email, country, created_at
        FROM petition_signatures
        ORDER BY created_at DESC
        LIMIT ${limit}
      `,
    ])

    return NextResponse.json({
      totalSignatures: Number(totalResult.rows[0]?.count ?? "0"),
      latestSignatures: latestResult.rows.map(mapSignature),
    })
  } catch (error) {
    console.error("Failed to fetch signatures", error)
    return NextResponse.json(
      { error: "Could not load signatures." },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    await ensureTable()
    const db = requirePool()

    const body = await request.json()
    const name = typeof body.name === "string" ? body.name.trim() : ""
    const email = typeof body.email === "string" ? body.email.trim() : ""
    const countryRaw = typeof body.country === "string" ? body.country.trim() : ""

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 })
    }

    const country = countryRaw.length > 0 ? countryRaw : null

    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      return NextResponse.json(
        {
          error: "Email reporting is not configured. Add RESEND_API_KEY in Vercel.",
        },
        { status: 500 }
      )
    }

    const insertResult = await db.sql<SignatureRow>`
      INSERT INTO petition_signatures (name, email, country)
      VALUES (${name}, ${email}, ${country})
      RETURNING id, name, email, country, created_at
    `

    const totalResult = await db.sql<{ count: string }>`
      SELECT COUNT(*)::text AS count FROM petition_signatures
    `

    const signature = mapSignature(insertResult.rows[0])

    const resend = new Resend(resendApiKey)
    const toEmail = process.env.SIGNATURE_NOTIFICATION_EMAIL ?? "sonkebusiness@gmail.com"
    const fromEmail = process.env.SIGNATURE_FROM_EMAIL ?? "onboarding@resend.dev"

    let emailDelivered = true

    try {
      await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        subject: "New petition signature received",
        text: `A new supporter signed the petition.\n\nName: ${name}\nEmail: ${email}\nCountry: ${country ?? "Not provided"}\nTime: ${new Date().toISOString()}`,
      })
    } catch (emailError) {
      emailDelivered = false
      console.error("Signature saved but email delivery failed", emailError)
    }

    return NextResponse.json({
      signature,
      totalSignatures: Number(totalResult.rows[0]?.count ?? "0"),
      emailDelivered,
    })
  } catch (error) {
    console.error("Failed to save signature", error)
    return NextResponse.json(
      { error: "Could not save signature. Please try again." },
      { status: 500 }
    )
  }
}
