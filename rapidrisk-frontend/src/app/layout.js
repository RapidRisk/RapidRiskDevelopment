// src/app/layout.js
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] }) // Configure the Inter font

export const metadata = {
  title: 'RapidRisk',
  description: 'Financial Analysis Dashboard',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Apply the font class to the body */}
      <body className={inter.className}>{children}</body>
    </html>
  )
}