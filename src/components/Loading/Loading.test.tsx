import {render, screen} from '@testing-library/react'
import Loading from './index'

describe('Loading Component', () => {
  test('renders loading icon', () => {
    render(<Loading />)

    const iconElement = screen.getByRole('img', {hidden: true})
    expect(iconElement).toBeInTheDocument()
    expect(iconElement).toHaveClass('fa-circle-notch')
  })

  test('has the correct container class', () => {
    render(<Loading />)

    const containerElement = document.querySelector('.loadingContainer')
    expect(containerElement).toHaveClass('loadingContainer')
  })
})
