import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Home from '../Home'
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}))

describe('Home', () => {
  it('renders the component', () => {
    const { container } = render(<Home />)
    expect(container.querySelector('.Home')).toBeInTheDocument()
  })

  it('toggles the content type id when a new type is added', () => {
    const { container } = render(<Home />)
    const newTypeButton = container.querySelector('.new-type-button')

    fireEvent.click(newTypeButton)
    expect(container.querySelector('.content-fields')).toBeInTheDocument()

    fireEvent.click(newTypeButton)
    expect(container.querySelector('.content-fields')).not.toBeInTheDocument()
  })
})
