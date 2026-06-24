import { loadFromStorage } from "./storage"
import { STORAGE_KEYS } from "./storageKeys"

export type TransportMode = "car" | "publicTransport"

export type ErrorCategory =
  | "no_route"
  | "invalid_address"
  | "rate_limited"
  | "network_error"
  | "api_error"

export interface LatLng {
  lat: number
  lng: number
}

export interface RouteResult {
  durationMinutes: number
  distanceKm: number
}

export interface HereApiError {
  category: ErrorCategory
  message: string
  httpStatus?: number
  correlationId?: string
}

export interface CommuteResult {
  car: RouteResult | HereApiError
  publicTransport: RouteResult | HereApiError | null
}

const HERE_GEOCODE_BASE = "https://geocode.search.hereapi.com/v1"
const HERE_ROUTE_BASE = "https://router.hereapi.com/v8"

export function getApiKey(): string {
  const fromStorage = loadFromStorage<string>(STORAGE_KEYS.hereApiKey, "")
  if (fromStorage) return fromStorage
  try {
    return import.meta.env.VITE_HERE_API_KEY ?? ""
  } catch {
    return ""
  }
}

async function hereFetch(url: string): Promise<Response | HereApiError> {
  try {
    const res = await fetch(url)
    return res
  } catch {
    return {
      category: "network_error",
      message: "Network error. Check your connection and try again.",
    }
  }
}

function extractCorrelationId(res: Response): string | undefined {
  return res.headers.get("X-Request-Id") ?? undefined
}

export async function geocodeAddress(
  address: string,
): Promise<LatLng | HereApiError> {
  const apiKey = getApiKey()
  if (!apiKey) {
    return {
      category: "api_error",
      message:
        "HERE API key is not configured. Enter one in Preferences or set VITE_HERE_API_KEY.",
    }
  }

  const url = `${HERE_GEOCODE_BASE}/geocode?q=${encodeURIComponent(address)}&apiKey=${apiKey}&limit=1`
  const result = await hereFetch(url)

  if ("category" in result) return result

  if (result.status === 429) {
    return {
      category: "rate_limited",
      message: "Too many requests. Please wait and try again.",
      httpStatus: 429,
      correlationId: extractCorrelationId(result),
    }
  }

  if (!result.ok) {
    return {
      category: "api_error",
      message: `Geocoding failed (${result.status})`,
      httpStatus: result.status,
      correlationId: extractCorrelationId(result),
    }
  }

  const data = await result.json()
  if (!data.items || data.items.length === 0) {
    return {
      category: "invalid_address",
      message:
        "We could not find this address. Please add postal code and house number.",
    }
  }

  return {
    lat: data.items[0].position.lat,
    lng: data.items[0].position.lng,
  }
}

export async function fetchRoute(
  origin: LatLng,
  destination: LatLng,
  mode: TransportMode,
): Promise<RouteResult | HereApiError> {
  const apiKey = getApiKey()
  if (!apiKey) {
    return {
      category: "api_error",
      message: "HERE API key is not configured.",
    }
  }

  const url = `${HERE_ROUTE_BASE}/routes?transportMode=${mode}&origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&return=summary&apiKey=${apiKey}`
  const result = await hereFetch(url)

  if ("category" in result) return result

  if (result.status === 429) {
    return {
      category: "rate_limited",
      message: "Too many requests. Please wait and try again.",
      httpStatus: 429,
      correlationId: extractCorrelationId(result),
    }
  }

  if (!result.ok) {
    const corrId = extractCorrelationId(result)
    if (mode === "publicTransport") {
      return {
        category: "no_route",
        message:
          "Public transport routing is not available for this route or API plan.",
        httpStatus: result.status,
        correlationId: corrId,
      }
    }
    return {
      category: "api_error",
      message: `Routing failed (${result.status})`,
      httpStatus: result.status,
      correlationId: corrId,
    }
  }

  const data = await result.json()
  if (!data.routes || data.routes.length === 0) {
    return {
      category: "no_route",
      message: "No route found between these addresses.",
    }
  }

  const summary = data.routes[0].sections[0].summary
  return {
    durationMinutes: Math.round(summary.duration / 60),
    distanceKm: Math.round((summary.length / 1000) * 10) / 10,
  }
}

export async function fetchCommute(
  originAddr: string,
  destinationAddr: string,
): Promise<CommuteResult> {
  const origin = await geocodeAddress(originAddr)
  if ("category" in origin) {
    return { car: origin, publicTransport: null }
  }

  const destination = await geocodeAddress(destinationAddr)
  if ("category" in destination) {
    return { car: destination, publicTransport: null }
  }

  const [carResult, ptResult] = await Promise.all([
    fetchRoute(origin, destination, "car"),
    fetchRoute(origin, destination, "publicTransport"),
  ])

  return {
    car: carResult,
    publicTransport: ptResult,
  }
}
