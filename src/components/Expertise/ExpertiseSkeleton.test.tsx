import {render, screen} from '@testing-library/react'
import ExpertiseSkeleton from './ExpertiseSkeleton'

describe('ExpertiseSkeleton', () => {
  it('renders correctly', () => {
    render(<ExpertiseSkeleton />)
    const items = screen.getAllByTestId('skeleton-item')
    expect(items).toHaveLength(3)
  })

  it('has the correct structure', () => {
    render(<ExpertiseSkeleton />)
    const items = screen.getAllByTestId('skeleton-item')
    items.forEach((item) => {
      expect(item).toHaveClass('item')
      expect(item.querySelector('.leftColumn')).toBeInTheDocument()
      expect(item.querySelector('.rightColumn')).toBeInTheDocument()
    })
  })
})
