import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import { headers } from "next/headers"
import { getStoreConfig } from "@lib/store-factory"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const headersList = await headers()
  const domain = headersList.get("host") || "localhost:8000"
  const store = await getStoreConfig(domain)

  // Fallback defaults if the API doesn't return a store
  const primaryColor = store?.theme?.primary_color || "#000000"
  const secondaryColor = store?.theme?.secondary_color || "#ffffff"

  return (
    <html 
      lang="en" 
      data-mode="light"
      style={{
        '--color-primary': primaryColor,
        '--color-secondary': secondaryColor,
      } as React.CSSProperties}
    >
      <body className="font-sans">
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
