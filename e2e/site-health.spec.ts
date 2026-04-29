import { test, expect } from '@playwright/test'

const LIVE_URL = 'https://pkuppens.github.io/'

test('live site renders content and nav works', async ({ page, request }) => {
  // Fast HTML shell sanity check: confirms we get the expected document, not an error page.
  const htmlResponse = await request.get(LIVE_URL)
  expect(htmlResponse.ok(), 'Expected a 2xx response for the home page HTML').toBe(true)
  const html = await htmlResponse.text()
  expect(html, 'Expected the HTML to contain the correct <title>').toContain(
    '<title>Pieter Kuppens | Software, Data and AI Engineer</title>',
  )
  expect(html, 'Expected the HTML shell to contain #root').toContain('id="root"')

  const response = await page.goto(LIVE_URL, { waitUntil: 'domcontentloaded' })
  expect(response, 'Expected a response for the home page').not.toBeNull()
  expect(response!.ok(), 'Expected a 2xx response for the home page').toBe(true)

  await expect(page).toHaveTitle('Pieter Kuppens | Software, Data and AI Engineer')

  // Header brand should be visible (signals React rendered and layout mounted)
  await expect(page.getByRole('link', { name: /Pieter Kuppens/i })).toBeVisible()

  // Home hero heading should exist
  await expect(page.getByRole('heading', { level: 1, name: /Pieter Kuppens/i })).toBeVisible()

  // Click-through checks (SPA navigation via header links)
  // exact: header link is "Profile"; hero also has "View Profile" — substring matching would resolve to two nodes.
  await page.getByRole('link', { name: 'Profile', exact: true }).click()
  await expect(page.getByRole('heading', { level: 2, name: 'Work Preferences' })).toBeVisible()

  await page.getByRole('link', { name: 'Projects' }).click()
  await expect(page.getByRole('heading', { level: 1, name: 'Projects & Demos' })).toBeVisible()

  await page.getByRole('link', { name: 'Opportunity Evaluator' }).click()
  await expect(page.getByRole('heading', { level: 1, name: /Opportunity Evaluator/i })).toBeVisible()
})

