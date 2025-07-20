import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "IPL T20 Dashboard",
  description: "Indian Premier League 2024 - Live Updates & Statistics",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen">
          <Navbar />
          <main className="mx-auto px-4 py-8">{children}</main>

          <footer className="bg-white border-t border-gray-200 mt-12">
            <div className="mx-auto p-4 text-center text-gray-600">
              <p>Copyright © IPL 2025 Assignment.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
