"use client"

import type React from "react"

import { ThemeProvider } from "next-themes"
import { SWRConfig } from "swr"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SWRConfig
        value={{
          fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
          revalidateOnFocus: false,
          revalidateIfStale: true,
        }}
      >
        {children}
      </SWRConfig>
    </ThemeProvider>
  )
}
