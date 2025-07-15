import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '\u200B',
  description: 'Easyly create and customize your resume with our intuitive builder',
  generator: 'developer',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
