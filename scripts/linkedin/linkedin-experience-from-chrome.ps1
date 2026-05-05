<#
.SYNOPSIS
  Start Chrome with CDP (optional), scrape LinkedIn experience, emit tmp/linkedin.xml.

.DESCRIPTION
  1) Close every Google Chrome window (profile lock otherwise).
  2) Runs npm linkedin:scrape:cdp:start (--start-chrome-cdp) unless -AttachOnly.
  3) Runs npm linkedin:xml.

  Repo root is derived from this script location (…/scripts/linkedin → repo root).

.PARAMETER AttachOnly
  Do not spawn Chrome; expect CDP already at http://127.0.0.1:9222 (use linkedin:scrape:cdp).

.PARAMETER CdpPort
  Remote debugging port when starting or attaching (default 9222).

.EXAMPLE
  .\scripts\linkedin\linkedin-experience-from-chrome.ps1

.EXAMPLE
  .\scripts\linkedin\linkedin-experience-from-chrome.ps1 -AttachOnly
#>
param(
  [switch] $AttachOnly,
  [int] $CdpPort = 9222
)

$ErrorActionPreference = 'Stop'
$RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path
Set-Location $RepoRoot

function Test-Command($Name) {
  return [bool](Get-Command $Name -ErrorAction SilentlyContinue)
}

if (-not (Test-Command 'npm')) {
  Write-Error 'npm not found. Install Node.js LTS and ensure npm is on PATH.'
}

Write-Host ''
Write-Host 'LinkedIn experience scrape (Windows helper)' -ForegroundColor Cyan
Write-Host "Repository: $RepoRoot"
Write-Host ''
Write-Host 'Important: quit Google Chrome completely before continuing (all windows).' -ForegroundColor Yellow
Write-Host 'Press Enter when Chrome is closed, or Ctrl+C to cancel.'
Read-Host | Out-Null

$env:LINKEDIN_CDP_PORT = "$CdpPort"
$cdpUrl = "http://127.0.0.1:$CdpPort"

if ($AttachOnly) {
  Write-Host "Attaching only (Chrome must already listen on $cdpUrl)..." -ForegroundColor Green
  npm run linkedin:scrape -- --cdp $cdpUrl
} else {
  Write-Host "Starting Chrome with debug port $CdpPort (if not already listening), then scraping..." -ForegroundColor Green
  npm run linkedin:scrape:cdp:start
}

if ($LASTEXITCODE -ne 0) {
  Write-Error "Scrape failed (exit $LASTEXITCODE). Fix Chrome/CDP, then retry."
}

Write-Host ''
Write-Host 'Building tmp/linkedin.xml ...' -ForegroundColor Green
npm run linkedin:xml
if ($LASTEXITCODE -ne 0) {
  Write-Error "linkedin:xml failed (exit $LASTEXITCODE)."
}

$outXml = Join-Path $RepoRoot 'tmp\linkedin.xml'
Write-Host ''
Write-Host "Done. See: $outXml" -ForegroundColor Cyan
if (Test-Path $outXml) {
  Get-Item $outXml | Format-List FullName, Length, LastWriteTime
}
