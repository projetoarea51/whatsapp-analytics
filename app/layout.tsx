import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/_components/Providers"
import Sidebar from "@/_components/Sidebar"
import Topbar from "@/_components/Topbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Plataforma de Análise do WhatsApp",
  description: "Transforme conversas do WhatsApp em métricas acionáveis",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Providers>
          <div className="flex h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden md:ml-[250px] transition-all duration-300">
              <Topbar />
              <main className="flex-1 overflow-auto p-4 bg-gray-50 dark:bg-gray-900">{children}</main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
