/**
 * Added to the real signature count for public display only (marketing).
 * Real totals in the database are unchanged. Set via Vercel / .env.local.
 */
export const SIGNATURE_DISPLAY_OFFSET = (() => {
  const raw = process.env.NEXT_PUBLIC_SIGNATURE_DISPLAY_OFFSET
  if (raw === undefined || raw === "") return 1500
  const n = Number.parseInt(raw, 10)
  return Number.isFinite(n) && n >= 0 ? n : 1500
})()
