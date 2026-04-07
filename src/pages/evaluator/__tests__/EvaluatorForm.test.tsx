import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import EvaluatorForm from '../EvaluatorForm'
import type { OpportunityInput } from '../../../domain/evaluator/types'

const defaultInput: OpportunityInput = {
  title: '',
  domain: '',
  hoursPerWeek: 40,
  dailyRate: 900,
  commuteMinutes: 30,
  hybridDaysOnsite: 2,
  durationMonths: 6,
  technologies: [],
  notes: '',
}

describe('EvaluatorForm', () => {
  it('renders form fields', () => {
    render(<EvaluatorForm initialInput={defaultInput} onEvaluate={vi.fn()} onReset={vi.fn()} />)
    expect(screen.getByLabelText(/Title \/ Role/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Domain \/ Industry/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Daily Rate/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Hours \/ Week/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Duration/i)).toBeInTheDocument()
  })

  it('renders evaluate and reset buttons', () => {
    render(<EvaluatorForm initialInput={defaultInput} onEvaluate={vi.fn()} onReset={vi.fn()} />)
    expect(screen.getByRole('button', { name: /Evaluate/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Reset/i })).toBeInTheDocument()
  })

  it('calls onEvaluate with form data on submit', () => {
    const onEvaluate = vi.fn()
    render(<EvaluatorForm initialInput={defaultInput} onEvaluate={onEvaluate} onReset={vi.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: /Evaluate/i }))
    expect(onEvaluate).toHaveBeenCalledTimes(1)
    expect(onEvaluate).toHaveBeenCalledWith(expect.objectContaining({ dailyRate: 900, hoursPerWeek: 40 }))
  })

  it('calls onReset when reset button is clicked', () => {
    const onReset = vi.fn()
    render(<EvaluatorForm initialInput={defaultInput} onEvaluate={vi.fn()} onReset={onReset} />)
    fireEvent.click(screen.getByRole('button', { name: /Reset/i }))
    expect(onReset).toHaveBeenCalledTimes(1)
  })

  it('can add a technology tag', () => {
    render(<EvaluatorForm initialInput={defaultInput} onEvaluate={vi.fn()} onReset={vi.fn()} />)
    const techInput = screen.getByLabelText('Add technology')
    fireEvent.change(techInput, { target: { value: 'Python' } })
    fireEvent.click(screen.getByRole('button', { name: /^Add$/i }))
    expect(screen.getByText('Python')).toBeInTheDocument()
  })

  it('can remove a technology tag', () => {
    const inputWithTech = { ...defaultInput, technologies: ['Python'] }
    render(<EvaluatorForm initialInput={inputWithTech} onEvaluate={vi.fn()} onReset={vi.fn()} />)
    expect(screen.getByText('Python')).toBeInTheDocument()
    fireEvent.click(screen.getByLabelText('Remove Python'))
    expect(screen.queryByText('Python')).not.toBeInTheDocument()
  })

  it('adds technology on Enter key', () => {
    render(<EvaluatorForm initialInput={defaultInput} onEvaluate={vi.fn()} onReset={vi.fn()} />)
    const techInput = screen.getByLabelText('Add technology')
    fireEvent.change(techInput, { target: { value: 'React' } })
    fireEvent.keyDown(techInput, { key: 'Enter' })
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('does not add duplicate technology', () => {
    const inputWithTech = { ...defaultInput, technologies: ['Python'] }
    render(<EvaluatorForm initialInput={inputWithTech} onEvaluate={vi.fn()} onReset={vi.fn()} />)
    const techInput = screen.getByLabelText('Add technology')
    fireEvent.change(techInput, { target: { value: 'Python' } })
    fireEvent.click(screen.getByRole('button', { name: /^Add$/i }))
    // Should still only have one Python badge
    expect(screen.getAllByText('Python')).toHaveLength(1)
  })

  it('includes technologies in the submitted form data', () => {
    const onEvaluate = vi.fn()
    render(<EvaluatorForm initialInput={defaultInput} onEvaluate={onEvaluate} onReset={vi.fn()} />)
    const techInput = screen.getByLabelText('Add technology')
    fireEvent.change(techInput, { target: { value: 'Azure' } })
    fireEvent.click(screen.getByRole('button', { name: /^Add$/i }))
    fireEvent.click(screen.getByRole('button', { name: /Evaluate/i }))
    expect(onEvaluate).toHaveBeenCalledWith(expect.objectContaining({ technologies: ['Azure'] }))
  })
})
