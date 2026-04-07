import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'

describe('Header', () => {
  function renderHeader() {
    return render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>,
    )
  }

  it('renders the brand name', () => {
    renderHeader()
    expect(screen.getByText('Peter Kuppens')).toBeInTheDocument()
  })

  it('renders all navigation links', () => {
    renderHeader()
    expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Profile/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Projects/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Opportunity Evaluator/i })).toBeInTheDocument()
  })

  it('Home link points to /', () => {
    renderHeader()
    expect(screen.getByRole('link', { name: /^Home$/i })).toHaveAttribute('href', '/')
  })

  it('Profile link points to /profile', () => {
    renderHeader()
    expect(screen.getByRole('link', { name: /^Profile$/i })).toHaveAttribute('href', '/profile')
  })

  it('Projects link points to /projects', () => {
    renderHeader()
    expect(screen.getByRole('link', { name: /^Projects$/i })).toHaveAttribute('href', '/projects')
  })

  it('Opportunity Evaluator link points to /evaluator', () => {
    renderHeader()
    expect(screen.getByRole('link', { name: /Opportunity Evaluator/i })).toHaveAttribute('href', '/evaluator')
  })

  it('renders a banner landmark', () => {
    renderHeader()
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('renders a navigation landmark', () => {
    renderHeader()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})

describe('Footer', () => {
  function renderFooter() {
    return render(<Footer />)
  }

  it('renders copyright with current year', () => {
    renderFooter()
    const year = new Date().getFullYear()
    expect(screen.getByText(new RegExp(String(year)))).toBeInTheDocument()
  })

  it('renders Peter Kuppens in copyright', () => {
    renderFooter()
    expect(screen.getByText(/Peter Kuppens/)).toBeInTheDocument()
  })

  it('renders GitHub link', () => {
    renderFooter()
    const githubLink = screen.getByRole('link', { name: /GitHub/i })
    expect(githubLink).toHaveAttribute('href', 'https://github.com/pkuppens')
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders LinkedIn link', () => {
    renderFooter()
    const linkedInLink = screen.getByRole('link', { name: /LinkedIn/i })
    expect(linkedInLink).toHaveAttribute('href', 'https://linkedin.com/in/peterkuppens')
    expect(linkedInLink).toHaveAttribute('target', '_blank')
    expect(linkedInLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders a contentinfo landmark', () => {
    renderFooter()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })
})
