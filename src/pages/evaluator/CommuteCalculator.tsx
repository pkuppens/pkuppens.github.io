import { useState } from "react"
import { fetchCommute } from "../../infrastructure/hereApi"
import type { CommuteResult, RouteResult, HereApiError } from "../../infrastructure/hereApi"
import { loadHomeAddress, saveHomeAddress, removeHomeAddress } from "../../infrastructure/homeAddressStorage"
import styles from "./CommuteCalculator.module.css"

interface Props {
  commuteOrigin?: string
  commuteDestination?: string
  onApply: (minutes: number) => void
}

type Status = "idle" | "loading" | "success" | "error"

function isRouteResult(r: RouteResult | HereApiError): r is RouteResult {
  return !("category" in r)
}

function formatDiagnostics(err: HereApiError): string {
  const lines: string[] = ["Error category: " + err.category]
  if (err.httpStatus !== undefined) lines.push("HTTP status: " + err.httpStatus)
  if (err.correlationId) lines.push("Request ID: " + err.correlationId)
  lines.push("Timestamp: " + new Date().toISOString())
  return lines.join("\n")
}

export default function CommuteCalculator({
  commuteOrigin = "",
  commuteDestination = "",
  onApply,
}: Props) {
  const savedOrigin = loadHomeAddress()
  const [origin, setOrigin] = useState(commuteOrigin || savedOrigin || "")
  const [destination, setDestination] = useState(commuteDestination || "")
  const [status, setStatus] = useState<Status>("idle")
  const [result, setResult] = useState<CommuteResult | null>(null)
  const [errorMsg, setErrorMsg] = useState("")
  const [diagnostics, setDiagnostics] = useState<string | null>(null)
  const [showDiag, setShowDiag] = useState(false)
  const [rememberOrigin, setRememberOrigin] = useState(!!savedOrigin)

  async function handleCalculate() {
    if (!origin.trim() || !destination.trim()) return

    setStatus("loading")
    setResult(null)
    setErrorMsg("")
    setDiagnostics(null)
    setShowDiag(false)

    const res = await fetchCommute(origin.trim(), destination.trim())
    setResult(res)

    if ("category" in res.car) {
      setStatus("error")
      setErrorMsg(res.car.message)
      setDiagnostics(formatDiagnostics(res.car))
    } else {
      setStatus("success")
    }
  }

  function handleApply() {
    if (!result || "category" in result.car) return
    onApply(result.car.durationMinutes)
    if (rememberOrigin) {
      saveHomeAddress(origin)
    } else {
      removeHomeAddress()
    }
  }

  const canCalculate = status !== "loading" && origin.trim() && destination.trim()

  return (
    <div className={styles.calculator}>
      <h3 className={styles.heading}>Commute Calculator</h3>
      <p className={styles.hint}>
        Enter Dutch addresses: <em>Street + house number, postal code, city</em>
      </p>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="calc-origin">
          Origin (your address)
        </label>
        <input
          id="calc-origin"
          type="text"
          className={styles.input}
          placeholder="e.g. Keizersgracht 123, 1015CZ, Amsterdam"
          value={origin}
          onChange={e => setOrigin(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="calc-dest">
          Destination (office address)
        </label>
        <input
          id="calc-dest"
          type="text"
          className={styles.input}
          placeholder="e.g. Stationsplein 1, 5211AP, Den Bosch"
          value={destination}
          onChange={e => setDestination(e.target.value)}
        />
      </div>

      <button
        type="button"
        className="btn btn-outline"
        onClick={handleCalculate}
        disabled={!canCalculate}
      >
        {status === "loading" ? "Calculating..." : "Calculate Commute"}
      </button>

      {status === "success" && result && (
        <div className={styles.results}>
          <div className={styles.resultCardLayout}>
            <div className={styles.resultCard}>
              <strong>Car</strong>
              {isRouteResult(result.car) ? (
                <p>
                  {result.car.durationMinutes} min &middot; {result.car.distanceKm} km
                </p>
              ) : (
                <p className={styles.errorText}>{result.car.message}</p>
              )}
            </div>

            <div className={styles.resultCard}>
              <strong>Public Transport</strong>
              {result.publicTransport && isRouteResult(result.publicTransport) ? (
                <p>
                  {result.publicTransport.durationMinutes} min &middot;{" "}
                  {result.publicTransport.distanceKm} km
                </p>
              ) : (
                <p className={styles.muted}>
                  {result.publicTransport
                    ? result.publicTransport.message
                    : "Not available for this route"}
                </p>
              )}
            </div>
          </div>

          {result.car && isRouteResult(result.car) && (
            <div className={styles.layout}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleApply}
              >
                Apply to Commute ({result.car.durationMinutes} min)
              </button>

              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={rememberOrigin}
                  onChange={e => setRememberOrigin(e.target.checked)}
                />
                Remember origin address
              </label>
            </div>
          )}
        </div>
      )}

      {status === "error" && (
        <div className={styles.error}>
          <p className={styles.errorText}>{errorMsg}</p>
          {diagnostics && (
            <details
              className={styles.diagnostics}
              open={showDiag}
              onToggle={e => setShowDiag((e.target as HTMLDetailsElement).open)}
            >
              <summary>Diagnostics</summary>
              <pre>{diagnostics}</pre>
            </details>
          )}
        </div>
      )}
    </div>
  )
}
