import { it, expect, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import CommuteCalculator from "../CommuteCalculator"

const mockFetchCommute = vi.fn()
const mockLoadHomeAddress = vi.fn()

vi.mock("../../../infrastructure/hereApi", () => ({
  fetchCommute: (...args: unknown[]) => mockFetchCommute(...args),
}))

vi.mock("../../../infrastructure/homeAddressStorage", () => ({
  loadHomeAddress: (...args: unknown[]) => mockLoadHomeAddress(...args),
}))

beforeEach(() => {
  vi.clearAllMocks()
  mockLoadHomeAddress.mockReturnValue(undefined)
})

function renderCalculator(props?: Partial<React.ComponentProps<typeof CommuteCalculator>>) {
  const onApply = vi.fn()
  const utils = render(
    <CommuteCalculator
      commuteDestination=""
      onApply={onApply}
      {...props}
    />,
  )
  return { ...utils, onApply }
}

it("renders inputs and calculate button in idle state", () => {
  renderCalculator()

  expect(screen.getByLabelText(/origin/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/destination/i)).toBeInTheDocument()
  expect(screen.getByRole("button", { name: /calculate commute/i })).toBeInTheDocument()
})

it("disables calculate button when destination is empty and no origin saved", () => {
  renderCalculator()

  const btn = screen.getByRole("button", { name: /calculate commute/i })
  expect(btn).toBeDisabled()
})

it("disables calculate button when destination is empty even with saved origin", () => {
  mockLoadHomeAddress.mockReturnValue("Amsterdam")
  renderCalculator()

  const btn = screen.getByRole("button", { name: /calculate commute/i })
  expect(btn).toBeDisabled()
})

it("enables calculate button when origin is saved and destination is filled", async () => {
  mockLoadHomeAddress.mockReturnValue("Amsterdam")
  renderCalculator()

  const user = userEvent.setup()
  await user.type(screen.getByLabelText(/destination/i), "Den Bosch")

  const btn = screen.getByRole("button", { name: /calculate commute/i })
  expect(btn).not.toBeDisabled()
})

it("shows hint when no origin is saved", () => {
  renderCalculator()

  expect(
    screen.getByText(/set your home address in the my preferences tab/i),
  ).toBeInTheDocument()
})

it("does not show hint when origin is saved", () => {
  mockLoadHomeAddress.mockReturnValue("Keizersgracht 123, Amsterdam")
  renderCalculator()

  expect(
    screen.queryByText(/set your home address in the my preferences tab/i),
  ).not.toBeInTheDocument()
})

it("shows loading state while calculating", async () => {
  mockLoadHomeAddress.mockReturnValue("Amsterdam")
  mockFetchCommute.mockImplementation(
    () =>
      new Promise(() => {
        /* never resolves */
      }),
  )

  renderCalculator()

  const user = userEvent.setup()
  await user.type(screen.getByLabelText(/destination/i), "D")
  await user.click(screen.getByRole("button", { name: /calculate commute/i }))

  expect(screen.getByRole("button", { name: /calculating/i })).toBeDisabled()
})

it("displays car and PT results on success", async () => {
  mockLoadHomeAddress.mockReturnValue("Amsterdam")
  mockFetchCommute.mockResolvedValue({
    car: { durationMinutes: 35, distanceKm: 42.5 },
    publicTransport: { durationMinutes: 55, distanceKm: 45 },
  })

  renderCalculator()

  const user = userEvent.setup()
  await user.type(screen.getByLabelText(/destination/i), "D")
  await user.click(screen.getByRole("button", { name: /calculate commute/i }))

  expect(await screen.findByText(/^35 min · 42\.5 km$/)).toBeInTheDocument()
  expect(screen.getByText(/^55 min · 45 km$/)).toBeInTheDocument()
  expect(screen.getByRole("button", { name: /apply to commute/i })).toBeInTheDocument()
})

it("calls onApply with correct minutes when Apply is clicked", async () => {
  mockLoadHomeAddress.mockReturnValue("Amsterdam")
  mockFetchCommute.mockResolvedValue({
    car: { durationMinutes: 35, distanceKm: 42.5 },
    publicTransport: null,
  })

  const { onApply } = renderCalculator()

  const user = userEvent.setup()
  await user.type(screen.getByLabelText(/destination/i), "D")
  await user.click(screen.getByRole("button", { name: /calculate commute/i }))

  const applyBtn = await screen.findByRole("button", { name: /apply to commute/i })
  await user.click(applyBtn)

  expect(onApply).toHaveBeenCalledWith(35)
})

it("shows friendly error on API failure", async () => {
  mockLoadHomeAddress.mockReturnValue("Amsterdam")
  mockFetchCommute.mockResolvedValue({
    car: {
      category: "invalid_address",
      message: "We could not find this address. Please add postal code and house number.",
    },
    publicTransport: null,
  })

  renderCalculator()

  const user = userEvent.setup()
  await user.type(screen.getByLabelText(/destination/i), "D")
  await user.click(screen.getByRole("button", { name: /calculate commute/i }))

  expect(
    await screen.findByText(/could not find this address/i),
  ).toBeInTheDocument()
})

it("shows hidden diagnostics on API error", async () => {
  mockLoadHomeAddress.mockReturnValue("Amsterdam")
  mockFetchCommute.mockResolvedValue({
    car: {
      category: "rate_limited",
      message: "Too many requests",
      httpStatus: 429,
      correlationId: "abc-123",
    },
    publicTransport: null,
  })

  renderCalculator()

  const user = userEvent.setup()
  await user.type(screen.getByLabelText(/destination/i), "D")
  await user.click(screen.getByRole("button", { name: /calculate commute/i }))

  const diag = await screen.findByText(/diagnostics/i)
  expect(diag).toBeInTheDocument()

  await user.click(diag)
  expect(screen.getByText(/rate_limited/i)).toBeInTheDocument()
  expect(screen.getByText(/429/i)).toBeInTheDocument()
})

it("shows PT not available when PT is null", async () => {
  mockLoadHomeAddress.mockReturnValue("Amsterdam")
  mockFetchCommute.mockResolvedValue({
    car: { durationMinutes: 20, distanceKm: 15 },
    publicTransport: null,
  })

  renderCalculator()

  const user = userEvent.setup()
  await user.type(screen.getByLabelText(/destination/i), "D")
  await user.click(screen.getByRole("button", { name: /calculate commute/i }))

  expect(await screen.findByText(/not available for this route/i)).toBeInTheDocument()
})

it("shows PT error message when PT returns HereApiError but car succeeds", async () => {
  mockLoadHomeAddress.mockReturnValue("Amsterdam")
  mockFetchCommute.mockResolvedValue({
    car: { durationMinutes: 20, distanceKm: 15 },
    publicTransport: {
      category: "no_route",
      message: "Public transport routing is not available for this route or API plan.",
    },
  })

  renderCalculator()

  const user = userEvent.setup()
  await user.type(screen.getByLabelText(/destination/i), "D")
  await user.click(screen.getByRole("button", { name: /calculate commute/i }))

  expect(await screen.findByText(/^20 min · 15 km$/)).toBeInTheDocument()
  expect(
    screen.getByText(/public transport routing is not available/i),
  ).toBeInTheDocument()
  expect(screen.getByRole("button", { name: /apply to commute/i })).toBeInTheDocument()
})
