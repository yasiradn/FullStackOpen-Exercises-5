import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AddNewBlog from './AddBlog'
import React from 'react'

test('form calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(<AddNewBlog handleBlogCreate={createBlog}/>)

  const form = component.container.querySelector('form')
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
})