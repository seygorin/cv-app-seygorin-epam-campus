import {render, screen} from '@testing-library/react'
import {useMediaQuery} from 'react-responsive'
import Navigation from './index'
import {useTranslation} from 'next-i18next'

jest.mock('react-responsive', () => ({
  useMediaQuery: jest.fn(),
}))

jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: jest.fn((id) => id.split(':').pop()),
  }),
}))

const mockUseMediaQuery = useMediaQuery as jest.Mock

describe('Navigation Component', () => {
  beforeEach(() => {
    mockUseMediaQuery.mockReset()
  })

  test('renders all navigation buttons with text on large screens', () => {
    mockUseMediaQuery.mockReturnValue(false)

    render(<Navigation />)

    expect(screen.getByText('aboutMe')).toBeInTheDocument()
    expect(screen.getByText('education')).toBeInTheDocument()
    expect(screen.getByText('experience')).toBeInTheDocument()
    expect(screen.getByText('skills')).toBeInTheDocument()
    expect(screen.getByText('portfolio')).toBeInTheDocument()
    expect(screen.getByText('contacts')).toBeInTheDocument()
    expect(screen.getByText('feedbacks')).toBeInTheDocument()
  })

  test('renders all navigation buttons without text on small screens', () => {
    mockUseMediaQuery.mockReturnValue(true)

    render(<Navigation />)

    const buttons = screen.getAllByRole('button')
    buttons.forEach((button) => {
      expect(button.textContent).toBe('')
    })
  })

  test('renders links with correct href attributes', () => {
    mockUseMediaQuery.mockReturnValue(false)

    render(<Navigation />)

    expect(screen.getByText('aboutMe').closest('a')).toHaveAttribute(
      'href',
      '#about-me'
    )
    expect(screen.getByText('education').closest('a')).toHaveAttribute(
      'href',
      '#education'
    )
    expect(screen.getByText('experience').closest('a')).toHaveAttribute(
      'href',
      '#experience'
    )
    expect(screen.getByText('skills').closest('a')).toHaveAttribute(
      'href',
      '#skills'
    )
    expect(screen.getByText('portfolio').closest('a')).toHaveAttribute(
      'href',
      '#portfolio'
    )
    expect(screen.getByText('contacts').closest('a')).toHaveAttribute(
      'href',
      '#contacts'
    )
    expect(screen.getByText('feedbacks').closest('a')).toHaveAttribute(
      'href',
      '#feedbacks'
    )
  })
})
