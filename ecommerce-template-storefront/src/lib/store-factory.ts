export type StoreConfig = {
  id: string
  name: string
  domain: string
  status: 'active' | 'inactive'
  medusa_sales_channel_id: string
  theme: {
    primary_color: string
    secondary_color: string
    font: string
  }
}

export async function getStoreConfig(domain: string): Promise<StoreConfig | null> {
  const payloadUrl = process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL || "http://localhost:3000"
  
  try {
    const res = await fetch(
      `${payloadUrl}/api/websites?where[domain][equals]=${encodeURIComponent(domain)}`,
      { next: { tags: ["websites"] }, cache: "force-cache" }
    )
    
    if (!res.ok) {
      console.error("Failed to fetch website config:", await res.text())
      return null
    }

    const data = await res.json()
    if (data.docs && data.docs.length > 0) {
      const website = data.docs[0]
      return {
        id: website.id,
        name: website.name,
        domain: website.domain,
        status: website.status,
        medusa_sales_channel_id: website.medusa_sales_channel_id,
        theme: website.theme || {
          primary_color: "#000000",
          secondary_color: "#ffffff",
          font: "Inter, sans-serif"
        }
      }
    }
    
    return null
  } catch (error) {
    console.error("Error fetching website config:", error)
    return null
  }
}

