import {render, fireEvent, waitFor} from '@testing-library/react'
import {Provider} from 'react-redux'
import {store} from '@/store/store'
import Skills from './index'

describe('Skills Component', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <Skills />
      </Provider>
    )
  })

  it('displays the edit button', () => {
    const {getByText} = render(
      <Provider store={store}>
        <Skills />
      </Provider>
    )
    expect(getByText('Open Edit')).toBeInTheDocument()
  })

  it('opens the form when the edit button is clicked', async () => {
    const {getByText} = render(
      <Provider store={store}>
        <Skills />
      </Provider>
    )
    fireEvent.click(getByText('Open Edit'))
    await waitFor(() => expect(getByText('Close Edit')).toBeInTheDocument())
  })

  it('displays the skill list', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <Skills />
      </Provider>
    )
    expect(getByTestId('skill-list')).toBeInTheDocument()
  })
})
