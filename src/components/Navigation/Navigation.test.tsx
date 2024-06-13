import {render, screen} from '@testing-library/react'
import {useMediaQuery} from 'react-responsive'
import Navigation from './index'

jest.mock('react-responsive', () => ({
  useMediaQuery: jest.fn(),
}))

const mockUseMediaQuery = useMediaQuery as jest.Mock

describe('Navigation Component', () => {
  beforeEach(() => {
    mockUseMediaQuery.mockReset()
  })

  test('renders all navigation buttons with text on large screens', () => {
    mockUseMediaQuery.mockReturnValue(false)

    render(<Navigation />)

    expect(screen.getByText('About me')).toBeInTheDocument()
    expect(screen.getByText('Education')).toBeInTheDocument()
    expect(screen.getByText('Experience')).toBeInTheDocument()
    expect(screen.getByText('Skills')).toBeInTheDocument()
    expect(screen.getByText('Portfolio')).toBeInTheDocument()
    expect(screen.getByText('Contacts')).toBeInTheDocument()
    expect(screen.getByText('Feedbacks')).toBeInTheDocument()
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

    expect(screen.getByText('About me').closest('a')).toHaveAttribute(
      'href',
      '#about-me'
    )
    expect(screen.getByText('Education').closest('a')).toHaveAttribute(
      'href',
      '#education'
    )
    expect(screen.getByText('Experience').closest('a')).toHaveAttribute(
      'href',
      '#experience'
    )
    expect(screen.getByText('Skills').closest('a')).toHaveAttribute(
      'href',
      '#skills'
    )
    expect(screen.getByText('Portfolio').closest('a')).toHaveAttribute(
      'href',
      '#portfolio'
    )
    expect(screen.getByText('Contacts').closest('a')).toHaveAttribute(
      'href',
      '#contacts'
    )
    expect(screen.getByText('Feedbacks').closest('a')).toHaveAttribute(
      'href',
      '#feedbacks'
    )
  })
})
