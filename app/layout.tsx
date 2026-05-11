import type { Metadata, Viewport } from 'next'
import { Bebas_Neue, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const bebasNeue = Bebas_Neue({ 
  weight: '400',
  subsets: ["latin"],
  variable: '--font-bebas'
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://viniout.vercel.app'),
  title: "Vini Out Petition | Real Madrid Fan Movement",
  description:
    "Join thousands of Real Madrid supporters calling for change. Sign the Vini Out petition today.",
  generator: 'v0.app',
  keywords: [
    "Vini Out",
    "Vinicius Out",
    "Vini Out Petition",
    "Real Madrid petition",
    "Madrid fans",
    "Vinicius Jr out",
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    title: "Vini Out Petition | Real Madrid Fan Movement",
    description:
      "Join thousands of Real Madrid supporters calling for change. Sign the Vini Out petition today.",
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Vini Out Petition | Real Madrid Fan Movement",
    description:
      "Join thousands of Real Madrid supporters calling for change. Sign the Vini Out petition today.",
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable} bg-background`}>
      <body className="font-sans antialiased bg-background text-foreground overflow-x-hidden">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
