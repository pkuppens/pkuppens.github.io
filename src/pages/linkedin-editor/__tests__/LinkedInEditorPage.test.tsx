import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LinkedInEditorPage from '../LinkedInEditorPage'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('LinkedInEditorPage', () => {
  it('renders with no items and no public-nav footprint of its own', () => {
    render(<LinkedInEditorPage />)
    expect(screen.getByRole('heading', { name: 'LinkedIn Experience Editor' })).toBeInTheDocument()
    expect(screen.getByText(/Nothing to preview yet/i)).toBeInTheDocument()
  })

  it('adds an experience, editing it updates the live preview', async () => {
    const user = userEvent.setup()
    render(<LinkedInEditorPage />)

    await user.click(screen.getByRole('button', { name: '+ Add experience' }))

    const companyInput = screen.getByLabelText('Company')
    await user.type(companyInput, 'Acme Corp')
    const taglineInput = screen.getByLabelText('Tagline / role title')
    await user.type(taglineInput, 'Staff Engineer')

    expect(screen.getByText('Acme Corp')).toBeInTheDocument()
    expect(screen.getByText('Staff Engineer')).toBeInTheDocument()
  })

  it('adding a task bullet shows it in the preview panel', async () => {
    const user = userEvent.setup()
    render(<LinkedInEditorPage />)

    await user.click(screen.getByRole('button', { name: '+ Add experience' }))
    await user.click(screen.getByRole('button', { name: '+ Add Task' }))
    await user.type(screen.getByLabelText('Tasks item 1'), 'Shipped the editor route')

    expect(screen.getByText('Shipped the editor route').closest('li')).not.toBeNull()
  })

  it('removing an item removes it from the form and the preview', async () => {
    const user = userEvent.setup()
    render(<LinkedInEditorPage />)

    await user.click(screen.getByRole('button', { name: '+ Add experience' }))
    await user.type(screen.getByLabelText('Company'), 'Temp Co')
    expect(screen.getByText('Temp Co')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Remove' }))
    expect(screen.queryByText('Temp Co')).not.toBeInTheDocument()
    expect(screen.getByText(/Nothing to preview yet/i)).toBeInTheDocument()
  })

  it('shows validation issues for an incomplete experience', async () => {
    const user = userEvent.setup()
    render(<LinkedInEditorPage />)

    await user.click(screen.getByRole('button', { name: '+ Add experience' }))
    expect(screen.getByText(/validation issue/i)).toBeInTheDocument()
    expect(screen.getByText(/Missing <tagline>/)).toBeInTheDocument()
    expect(screen.getByText(/Missing <company>/)).toBeInTheDocument()
  })

  it('loads XML from the dev-only API and populates the form', async () => {
    const user = userEvent.setup()
    const sampleXml = `<?xml version="1.0" encoding="UTF-8"?>
<experiences xmlns="https://pkuppens.github.io/ns/linkedin-experience">
  <experience id="acme-2020">
    <tagline>Engineer</tagline>
    <company>Acme</company>
    <period><startDate yearMonth="2020-01"/><endDate current="true"/></period>
  </experience>
</experiences>`
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, text: () => Promise.resolve(sampleXml) }),
    )

    render(<LinkedInEditorPage />)
    await user.click(screen.getByRole('button', { name: /Load data\/linkedin\/pieterkuppens\.xml/ }))

    expect(await screen.findByText('Loaded.')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Acme')).toBeInTheDocument()
    expect(fetch).toHaveBeenCalledWith('/api/linkedin/experiences/pieterkuppens')
  })

  it('saves the current model to the dev-only API as XML', async () => {
    const user = userEvent.setup()
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200, statusText: 'OK' })
    vi.stubGlobal('fetch', fetchMock)

    render(<LinkedInEditorPage />)
    await user.click(screen.getByRole('button', { name: '+ Add experience' }))
    await user.click(screen.getByRole('button', { name: /Save to data\/linkedin\/pieterkuppens\.xml/ }))

    expect(await screen.findByText(/Saved to data\/linkedin\/pieterkuppens\.xml/)).toBeInTheDocument()
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('/api/linkedin/experiences/pieterkuppens')
    expect(init).toMatchObject({ method: 'POST' })
    expect(String(init.body)).toContain('<experiences')
  })
})

describe('LinkedInEditorPage experience group', () => {
  it('adds a group with a nested role and previews it', async () => {
    const user = userEvent.setup()
    render(<LinkedInEditorPage />)

    await user.click(screen.getByRole('button', { name: '+ Add experience group' }))
    await user.type(screen.getByLabelText('Company'), 'Group Co')
    await user.click(screen.getByRole('button', { name: '+ Add role to this group' }))

    const roleTaglineInputs = screen.getAllByLabelText('Tagline / role title')
    await user.type(roleTaglineInputs[roleTaglineInputs.length - 1], 'Contractor')

    expect(screen.getByText('Group Co')).toBeInTheDocument()
    expect(screen.getByText('Contractor')).toBeInTheDocument()
  })
})
