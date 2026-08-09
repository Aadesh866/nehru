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
  const store = getStoreConfig(domain)

  return (
    <html 
      lang="en" 
      data-mode="light"
      style={{
        '--color-primary': store.theme.primaryColor,
        '--color-secondary': store.theme.secondaryColor,
      } as React.CSSProperties}
    >
      <body className="font-sans">
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
