import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import EvaluatorResults from '../EvaluatorResults'
import type { EvaluationResult } from '../../../domain/evaluator/types'

const excellentResult: EvaluationResult = {
  totalScore: 92,
  level: 'excellent',
  recommendation: 'Strong fit — strongly recommended.',
  criterionScores: [
    { criterionId: 'domain', label: 'Domain Fit', weight: 20, rawScore: 100, weightedScore: 17.4 },
    { criterionId: 'rate', label: 'Daily Rate', weight: 25, rawScore: 100, weightedScore: 21.7 },
    { criterionId: 'hours', label: 'Hours / Week', weight: 15, rawScore: 100, weightedScore: 13.0 },
  ],
}

const poorResult: EvaluationResult = {
  totalScore: 25,
  level: 'poor',
  recommendation: 'Poor fit — recommend passing.',
  criterionScores: [
    { criterionId: 'rate', label: 'Daily Rate', weight: 25, rawScore: 0, weightedScore: 0 },
  ],
}

const fairResult: EvaluationResult = {
  totalScore: 45,
  level: 'fair',
  recommendation: 'Moderate fit.',
  criterionScores: [],
}

const goodResult: EvaluationResult = {
  totalScore: 65,
  level: 'good',
  recommendation: 'Good fit.',
  criterionScores: [],
}

describe('EvaluatorResults', () => {
  it('renders the total score', () => {
    render(<EvaluatorResults result={excellentResult} />)
    expect(screen.getByText('92')).toBeInTheDocument()
  })

  it('renders excellent level label', () => {
    render(<EvaluatorResults result={excellentResult} />)
    expect(screen.getByText('🌟 Excellent Fit')).toBeInTheDocument()
  })

  it('renders poor level label', () => {
    render(<EvaluatorResults result={poorResult} />)
    expect(screen.getByText('❌ Poor Fit')).toBeInTheDocument()
  })

  it('renders fair level label', () => {
    render(<EvaluatorResults result={fairResult} />)
    expect(screen.getByText('⚠️ Fair Fit')).toBeInTheDocument()
  })

  it('renders good level label', () => {
    render(<EvaluatorResults result={goodResult} />)
    expect(screen.getByText('✅ Good Fit')).toBeInTheDocument()
  })

  it('renders the recommendation text', () => {
    render(<EvaluatorResults result={excellentResult} />)
    expect(screen.getByText('Strong fit — strongly recommended.')).toBeInTheDocument()
  })

  it('renders criterion labels in score breakdown', () => {
    render(<EvaluatorResults result={excellentResult} />)
    expect(screen.getByText('Domain Fit')).toBeInTheDocument()
    expect(screen.getByText('Daily Rate')).toBeInTheDocument()
    expect(screen.getByText('Hours / Week')).toBeInTheDocument()
  })

  it('renders criterion raw scores', () => {
    render(<EvaluatorResults result={excellentResult} />)
    const percentages = screen.getAllByText('100%')
    expect(percentages.length).toBeGreaterThanOrEqual(3)
  })

  it('renders the /100 suffix', () => {
    render(<EvaluatorResults result={excellentResult} />)
    expect(screen.getByText('/100')).toBeInTheDocument()
  })

  it('has accessible aria-label on the results container', () => {
    render(<EvaluatorResults result={excellentResult} />)
    expect(screen.getByLabelText('Evaluation results')).toBeInTheDocument()
  })

  it('renders progress bars for each criterion', () => {
    render(<EvaluatorResults result={excellentResult} />)
    const progressBars = screen.getAllByRole('progressbar')
    expect(progressBars).toHaveLength(excellentResult.criterionScores.length)
  })
})
