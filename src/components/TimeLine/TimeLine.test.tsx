import {render, screen} from '@testing-library/react'
import TimeLine from '../TimeLine'


describe('TimeLine', () => {
  const data = [
    {date: 2021, title: 'Title 1', text: 'Text 1'},
    {date: 2022, title: 'Title 2', text: 'Text 2'},
  ]

  test('renders correctly with given data', () => {
    render(<TimeLine data={data} />)

    data.forEach((item) => {
      expect(screen.getByText(item.date.toString())).toBeInTheDocument()
      expect(screen.getByText(item.title)).toBeInTheDocument()
      expect(screen.getByText(item.text)).toBeInTheDocument()
    })
  })

  test('applies correct styles', () => {
    render(<TimeLine data={data} />)

    const timelineElement = screen.getByTestId('timeline')
    expect(timelineElement).toHaveClass('timeline')

    data.forEach((item, index) => {
      const timelineItemElement = screen.getByTestId(`timeline-item-${index}`)
      expect(timelineItemElement).toHaveClass('timelineItem')
    })
  })
})
