import {render, screen} from '@testing-library/react'
import Box from './index'
import {useTheme} from 'next-themes'

jest.mock('next-themes')

describe('Box Component', () => {
  beforeEach(() => {
    ;(useTheme as jest.Mock).mockReturnValue({theme: 'light'})
  })

  test('renders title and content', () => {
    render(<Box title='Test Title' content={<p>Test Content</p>} />)

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  test('applies dark theme class when theme is dark', () => {
    ;(useTheme as jest.Mock).mockReturnValue({theme: 'dark'})

    render(<Box title='Test Title' content={<p>Test Content</p>} />)

    const boxElement = screen.getByText('Test Title').parentElement
    expect(boxElement).toHaveClass('dark')
  })

  test('does not apply dark theme class when theme is light', () => {
    ;(useTheme as jest.Mock).mockReturnValue({theme: 'light'})

    render(<Box title='Test Title' content={<p>Test Content</p>} />)

    const boxElement = screen.getByText('Test Title').parentElement
    expect(boxElement).not.toHaveClass('dark')
  })
})
