export type StoreConfig = {
  id: string
  name: string
  domain: string
  theme: {
    primaryColor: string
    secondaryColor: string
    fontFamily: string
  }
}

// Mock database of stores
const stores: StoreConfig[] = [
  {
    id: "store_1",
    name: "Store One (Default)",
    domain: "localhost:8000",
    theme: {
      primaryColor: "#3b82f6", // Blue
      secondaryColor: "#1d4ed8",
      fontFamily: "Inter, sans-serif",
    },
  },
  {
    id: "store_2",
    name: "Store Two (Premium)",
    domain: "store2.localhost:8000",
    theme: {
      primaryColor: "#10b981", // Emerald
      secondaryColor: "#047857",
      fontFamily: "Inter, sans-serif",
    },
  },
  {
    id: "store_3",
    name: "Store Three (Luxury)",
    domain: "store3.localhost:8000",
    theme: {
      primaryColor: "#f59e0b", // Amber
      secondaryColor: "#b45309",
      fontFamily: "Inter, sans-serif",
    },
  },
]

export function getStoreConfig(domain: string): StoreConfig {
  // Try to find the store by domain
  const store = stores.find((s) => s.domain === domain)
  
  // Return the found store or fallback to the default (first one)
  return store || stores[0]
}
