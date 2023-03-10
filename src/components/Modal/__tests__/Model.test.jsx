import { render, fireEvent, waitFor } from '@testing-library/react'
import Modal from '../Modal'

import React from 'react'

jest.mock('../../../utils/makeRequest')

describe('Modal', () => {
  let closeModalMock
  let addContentTypeMock
  const data = { name: 'New Content Type' }
  const event = { preventDefault: jest.fn() }

  beforeEach(() => {
    closeModalMock = jest.fn()
    addContentTypeMock = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders without crashing', () => {
    render(<Modal closeModal={closeModalMock} addContentType={addContentTypeMock} />)
  })

  it('displays the input field', () => {
    const { getByPlaceholderText } = render(
      <Modal closeModal={closeModalMock} addContentType={addContentTypeMock} />,
    )
    const input = getByPlaceholderText('')

    expect(input).toBeInTheDocument()
  })

  // it('updates the input value on change', () => {
  //   const { getByPlaceholderText } = render(
  //     <Modal closeModal={closeModalMock} addContentType={addContentTypeMock} />,
  //   )
  //   const input = getByPlaceholderText('')
  //   fireEvent.change(input, { target: { value: 'New Content Type' } })

  //   expect(input.value).toEqual('New Content Type')
  // })

  it('calls the closeModal function when Cancel button is clicked', () => {
    const { getByTestId } = render(
      <Modal closeModal={closeModalMock} addContentType={addContentTypeMock} />,
    )
    const cancelButton = getByTestId('cancel-btn')

    fireEvent.click(cancelButton)

    expect(closeModalMock).toHaveBeenCalled()
  })
})
