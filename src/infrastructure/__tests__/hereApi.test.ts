import { it, expect, vi, beforeEach } from "vitest"
import { geocodeAddress, fetchRoute, fetchCommute } from "../hereApi"
import type { LatLng, RouteResult, HereApiError } from "../hereApi"

const mockFetch = vi.fn()
globalThis.fetch = mockFetch

beforeEach(() => {
  vi.clearAllMocks()
  localStorage.setItem("pkuppens_here_api_key", JSON.stringify("test-key-123"))
})

// ---- geocodeAddress ----

it("returns LatLng for a valid address", async () => {
  mockFetch.mockResolvedValue({
    ok: true,
    status: 200,
    headers: new Map(),
    json: async () => ({
      items: [{ position: { lat: 51.69, lng: 5.3 } }],
    }),
  })

  const result = await geocodeAddress("Stationsplein 1, 5211AP, Den Bosch")
  expect(result).not.toHaveProperty("category")
  expect((result as LatLng).lat).toBeCloseTo(51.69, 1)
  expect((result as LatLng).lng).toBeCloseTo(5.3, 1)
})

it("returns invalid_address when geocoding finds no items", async () => {
  mockFetch.mockResolvedValue({
    ok: true,
    status: 200,
    headers: new Map(),
    json: async () => ({ items: [] }),
  })

  const result = await geocodeAddress("Invalid")
  expect(result).toHaveProperty("category", "invalid_address")
})

it("returns rate_limited on HTTP 429", async () => {
  const headers = new Map()
  headers.set("X-Request-Id", "abc-123")
  mockFetch.mockResolvedValue({
    ok: false,
    status: 429,
    headers,
    json: async () => ({}),
  })

  const result = await geocodeAddress("Something")
  expect(result).toHaveProperty("category", "rate_limited")
  expect((result as HereApiError).correlationId).toBe("abc-123")
  expect((result as HereApiError).httpStatus).toBe(429)
})

it("returns network_error on fetch rejection", async () => {
  mockFetch.mockRejectedValue(new Error("Network failure"))

  const result = await geocodeAddress("Something")
  expect(result).toHaveProperty("category", "network_error")
})

it("returns api_error on HTTP 403", async () => {
  const headers = new Map()
  headers.set("X-Request-Id", "req-403")
  mockFetch.mockResolvedValue({
    ok: false,
    status: 403,
    headers,
    json: async () => ({}),
  })

  const result = await geocodeAddress("Something")
  expect(result).toHaveProperty("category", "api_error")
  expect((result as HereApiError).httpStatus).toBe(403)
  expect((result as HereApiError).correlationId).toBe("req-403")
})

// ---- fetchRoute ----

it("returns RouteResult for a valid car route", async () => {
  mockFetch.mockResolvedValue({
    ok: true,
    status: 200,
    headers: new Map(),
    json: async () => ({
      routes: [
        {
          sections: [{ summary: { duration: 2700, length: 85000 } }],
        },
      ],
    }),
  })

  const result = await fetchRoute(
    { lat: 51.69, lng: 5.3 },
    { lat: 52.08, lng: 4.31 },
    "car",
  )
  expect(result).not.toHaveProperty("category")
  expect((result as RouteResult).durationMinutes).toBe(45)
  expect((result as RouteResult).distanceKm).toBe(85)
})

it("returns no_route when routes array is empty", async () => {
  mockFetch.mockResolvedValue({
    ok: true,
    status: 200,
    headers: new Map(),
    json: async () => ({ routes: [] }),
  })

  const result = await fetchRoute({ lat: 0, lng: 0 }, { lat: 1, lng: 1 }, "car")
  expect(result).toHaveProperty("category", "no_route")
})

it("returns no_route for public transport on HTTP 400", async () => {
  mockFetch.mockResolvedValue({
    ok: false,
    status: 400,
    headers: new Map(),
    json: async () => ({}),
  })

  const result = await fetchRoute(
    { lat: 51.69, lng: 5.3 },
    { lat: 52.08, lng: 4.31 },
    "publicTransport",
  )
  expect(result).toHaveProperty("category", "no_route")
})

it("returns api_error for car on HTTP 500", async () => {
  mockFetch.mockResolvedValue({
    ok: false,
    status: 500,
    headers: new Map(),
    json: async () => ({}),
  })

  const result = await fetchRoute({ lat: 0, lng: 0 }, { lat: 1, lng: 1 }, "car")
  expect(result).toHaveProperty("category", "api_error")
})

// ---- fetchCommute ----

it("returns results for both modes when all requests succeed", async () => {
  const geocodeResponse = () => ({
    ok: true,
    status: 200,
    headers: new Map(),
    json: async () => ({
      items: [{ position: { lat: 51.69, lng: 5.3 } }],
    }),
  })

  const routeResponse = () => ({
    ok: true,
    status: 200,
    headers: new Map(),
    json: async () => ({
      routes: [
        { sections: [{ summary: { duration: 2700, length: 85000 } }] },
      ],
    }),
  })

  mockFetch
    .mockResolvedValueOnce(geocodeResponse())
    .mockResolvedValueOnce(geocodeResponse())
    .mockResolvedValueOnce(routeResponse())
    .mockResolvedValueOnce(routeResponse())

  const result = await fetchCommute("Origin", "Destination")
  expect(result.car).not.toHaveProperty("category")
  expect(result.publicTransport).not.toHaveProperty("category")
  expect((result.car as RouteResult).durationMinutes).toBe(45)
  expect((result.publicTransport as RouteResult).distanceKm).toBe(85)
})

it("returns null for PT when it fails, car still succeeds", async () => {
  const geocodeOk = {
    ok: true,
    status: 200,
    headers: new Map(),
    json: async () => ({
      items: [{ position: { lat: 51.69, lng: 5.3 } }],
    }),
  }

  const routeOk = {
    ok: true,
    status: 200,
    headers: new Map(),
    json: async () => ({
      routes: [
        { sections: [{ summary: { duration: 1800, length: 50000 } }] },
      ],
    }),
  }

  const routeFail = {
    ok: false,
    status: 400,
    headers: new Map(),
    json: async () => ({}),
  }

  mockFetch
    .mockResolvedValueOnce(geocodeOk)
    .mockResolvedValueOnce(geocodeOk)
    .mockResolvedValueOnce(routeOk)
    .mockResolvedValueOnce(routeFail)

  const result = await fetchCommute("O", "D")
  expect(result.car).not.toHaveProperty("category")
  expect(result.publicTransport).toHaveProperty("category", "no_route")
})

it("returns error for both when geocoding fails", async () => {
  mockFetch.mockResolvedValue({
    ok: true,
    status: 200,
    headers: new Map(),
    json: async () => ({ items: [] }),
  })

  const result = await fetchCommute("Invalid", "Nowhere")
  expect(result.car).toHaveProperty("category", "invalid_address")
  expect(result.publicTransport).toBeNull()
})
