import {render, screen} from '@testing-library/react'

import PortfolioInfo from './index'

describe('PortfolioInfo Component', () => {
  const props = {
    title: 'Project Title',
    text: 'This is a description of the project.',
    url: 'https://example.com',
  }

  test('renders the title', () => {
    render(<PortfolioInfo {...props} />)
    const titleElement = screen.getByText(props.title)
    expect(titleElement).toBeInTheDocument()
    expect(titleElement).toHaveClass('title')
  })

  test('renders the text', () => {
    render(<PortfolioInfo {...props} />)
    const textElement = screen.getByText(props.text)
    expect(textElement).toBeInTheDocument()
  })

  test('renders the link with correct href and text', () => {
    render(<PortfolioInfo {...props} />)
    const linkElement = screen.getByRole('link', {name: /view source/i})
    expect(linkElement).toBeInTheDocument()
    expect(linkElement).toHaveAttribute('href', props.url)
    expect(linkElement).toHaveClass('link')
  })
})
