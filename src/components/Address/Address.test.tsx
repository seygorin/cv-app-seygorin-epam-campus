import {render, screen} from '@testing-library/react'
import Address from '../Address'

interface FontAwesomeIconProps {
  icon: {iconName: string}
}

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({icon}: FontAwesomeIconProps) => (
    <i className={`fa ${icon.iconName}`}></i>
  ),
}))

describe('Address', () => {
  beforeEach(() => {
    render(<Address />)
  })

  test('renders phone icon and number', () => {
    expect(screen.getByText('+888 0239 5746')).toBeInTheDocument()
    expect(screen.getByRole('link', {name: '+888 0239 5746'})).toHaveAttribute(
      'href',
      'tel:+88802395746'
    )
  })

  test('renders email icon and address', () => {
    const emailLinks = screen.getAllByText('seygorin@gmail.com')
    expect(emailLinks).toHaveLength(1)
    expect(emailLinks[0]).toBeInTheDocument()
    expect(emailLinks[0]).toHaveAttribute('href', 'mailto:seygorin@gmail.com')
  })

  test('renders Telegram icon and links', () => {
    expect(screen.getByText('Telegram')).toBeInTheDocument()
    expect(screen.getByRole('link', {name: 'Telegram'})).toHaveAttribute(
      'href',
      'https://t.me/seygorin'
    )
    expect(
      screen.getByRole('link', {name: 'www.telegram.org'})
    ).toHaveAttribute('href', 'https://t.me/seygorin')
  })

  test('renders LinkedIn icon and links', () => {
    expect(screen.getByText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByRole('link', {name: 'LinkedIn'})).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/sergey-gorin/'
    )
    expect(
      screen.getByRole('link', {name: 'www.linkedin.com'})
    ).toHaveAttribute('href', 'https://www.linkedin.com/in/sergey-gorin/')
  })
})
