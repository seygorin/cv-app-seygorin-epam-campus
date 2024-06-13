import {render, screen} from '@testing-library/react'

import Expertise from './index'

const mockData = [
  {
    date: '2021-2022',
    info: {
      company: 'Company A',
      job: 'Developer',
      description: 'Developed various web applications.',
    },
  },
  {
    date: '2020-2021',
    info: {
      company: 'Company B',
      job: 'Designer',
      description: 'Designed user interfaces and experiences.',
    },
  },
  {
    date: '2019-2020',
    info: {
      company: 'Company C',
      job: 'Manager',
      description: 'Managed projects and teams.',
    },
  },
]

describe('Expertise', () => {
  beforeEach(() => {
    render(<Expertise data={mockData} />)
  })

  test('renders the correct number of experience items', () => {
    const items = screen.getAllByRole('heading', {level: 3})
    expect(items).toHaveLength(mockData.length * 2)
  })

  test('renders the correct company names and job titles', () => {
    mockData.forEach((item) => {
      expect(screen.getByText(item.info.company)).toBeInTheDocument()
      expect(screen.getByText(item.info.job)).toBeInTheDocument()
    })
  })

  test('renders the correct dates and descriptions', () => {
    mockData.forEach((item) => {
      expect(screen.getByText(item.date)).toBeInTheDocument()
      expect(screen.getByText(item.info.description)).toBeInTheDocument()
    })
  })
})
