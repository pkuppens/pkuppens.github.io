/**
 * Tests for the shared training quiz engine (public/trainings/shared/quiz.js).
 *
 * The engine is a vanilla-JS IIFE that attaches `window.Quiz`. It is shipped as a
 * static asset (served verbatim by Vite) and shared by every training — AI-901,
 * DP-900, and future ones — so a regression here breaks all of them. We load the
 * real source file into the jsdom global and drive it through the DOM.
 *
 * Regression under test: a "match" (assign-each) question was revealed/locked as
 * soon as ONE dropdown was chosen, because unselected dropdowns produced NaN
 * (their placeholder <option> had no value="" ), and NaN slipped past the
 * "is this row answered?" check. The same latent bug existed for "order".
 */
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { beforeAll, describe, expect, it } from 'vitest'

interface QuizQuestion {
  tag?: string
  type?: 'single' | 'multi' | 'match' | 'order'
  q: string
  options?: string[]
  items?: string[]
  categories?: string[]
  answer?: number | number[]
  answers?: number[]
  why: string
}

interface QuizConfig {
  mode?: 'practice' | 'exam'
  passMark?: number
  questions: QuizQuestion[]
}

interface QuizGlobal {
  render(elId: string, cfg: QuizConfig): void
}

declare global {
  interface Window {
    Quiz: QuizGlobal
  }
}

const quizSource = readFileSync(resolve(process.cwd(), 'public/trainings/shared/quiz.js'), 'utf8')

beforeAll(() => {
  // Execute the IIFE in the jsdom global scope; it reads/writes the global `window`.
  new Function(quizSource)()
})

/** Render a single-question quiz into a fresh container and return that container. */
function renderQuiz(question: QuizQuestion, id = 'quiz-root'): HTMLElement {
  document.body.innerHTML = `<div class="quiz" id="${id}"></div>`
  window.Quiz.render(id, { passMark: 0.7, questions: [question] })
  return document.getElementById(id) as HTMLElement
}

/** Choose a dropdown value and fire the change event the engine listens for. */
function choose(select: HTMLSelectElement, value: string): void {
  select.value = value
  select.dispatchEvent(new Event('change', { bubbles: true }))
}

/** The engine appends a `.why` explanation only once a question is revealed/graded. */
function isRevealed(card: HTMLElement): boolean {
  return card.querySelector('.why') !== null
}

const matchQuestion: QuizQuestion = {
  tag: 'D1',
  type: 'match',
  q: 'Match each data example to how it is represented.',
  items: ['Customer table row', 'JSON document', 'PNG image'],
  categories: ['Structured', 'Semi-structured', 'Unstructured'],
  answer: [0, 1, 2],
  why: 'Rows are structured, JSON is semi-structured, images are unstructured.',
}

describe('shared quiz engine — match ("assign each") questions', () => {
  it('does NOT reveal the question after only one of several items is assigned', () => {
    const card = renderQuiz(matchQuestion)
    const selects = card.querySelectorAll<HTMLSelectElement>('.match-sel')
    expect(selects.length).toBe(3)

    // Assign just the first dropdown — two rows are still unassigned.
    choose(selects[0], '0')

    expect(isRevealed(card)).toBe(false)
    expect(selects[0].disabled).toBe(false)
  })

  it('reveals the question only once every item has been assigned', () => {
    const card = renderQuiz(matchQuestion)
    const selects = card.querySelectorAll<HTMLSelectElement>('.match-sel')

    choose(selects[0], '0')
    expect(isRevealed(card)).toBe(false)
    choose(selects[1], '1')
    expect(isRevealed(card)).toBe(false)
    choose(selects[2], '2')

    expect(isRevealed(card)).toBe(true)
  })
})

describe('shared quiz engine — order questions (same latent bug)', () => {
  const orderQuestion: QuizQuestion = {
    type: 'order',
    q: 'Put these steps in order.',
    items: ['First', 'Second', 'Third'],
    why: 'Alphabetical here.',
  }

  it('does NOT reveal until every position is chosen', () => {
    const card = renderQuiz(orderQuestion)
    const selects = card.querySelectorAll<HTMLSelectElement>('.order-sel')

    choose(selects[0], '0')
    expect(isRevealed(card)).toBe(false)

    choose(selects[1], '1')
    choose(selects[2], '2')
    expect(isRevealed(card)).toBe(true)
  })
})

describe('shared quiz engine — AI-901 question types unchanged (no regression)', () => {
  it('reveals a single-answer question immediately on selection', () => {
    const card = renderQuiz({
      type: 'single',
      q: 'Pick one.',
      options: ['a', 'b', 'c'],
      answer: 0,
      why: 'a is right.',
    })
    const radio = card.querySelector<HTMLInputElement>('input[type=radio]') as HTMLInputElement
    radio.checked = true
    radio.dispatchEvent(new Event('change', { bubbles: true }))

    expect(isRevealed(card)).toBe(true)
  })

  it('does NOT grade a "select N" question until N options are checked, then marks a correct pair correct', () => {
    // Regression: selecting one correct option used to reveal + grade immediately,
    // scoring a genuinely-correct answer as "wrong" before the second pick.
    const card = renderQuiz({
      type: 'multi',
      q: 'Select the TWO correct options.',
      options: ['a', 'b', 'c', 'd'],
      answers: [0, 1], // "select 2"
      why: 'a and b.',
    })
    // Check options are ordered by their original index via the value attribute.
    const boxFor = (origIndex: number) =>
      card.querySelector<HTMLInputElement>(`input[type=checkbox][value="${origIndex}"]`) as HTMLInputElement

    const check = (box: HTMLInputElement) => {
      box.checked = true
      box.dispatchEvent(new Event('change', { bubbles: true }))
    }

    // One of the two correct options — must NOT reveal yet (only 1 of 2 chosen).
    check(boxFor(0))
    expect(isRevealed(card)).toBe(false)

    // The second correct option completes the pick → reveals and grades correct.
    check(boxFor(1))
    expect(isRevealed(card)).toBe(true)
    expect(card.querySelector('.why.ok')).not.toBeNull()
    expect(card.querySelector('.why.no')).toBeNull()
  })
})
