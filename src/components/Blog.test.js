import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author', () => {
  const blog = {
    title: 'This is a test',
    author: 'Jhon Doe',
    likes: 10,
    url: 'hackernews.com'
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'This is a test'
  )
  expect(component.container).toHaveTextContent(
    'Jhon Doe'
  )
  expect(component.container).not.toHaveTextContent(
    'hackernews.com'
  )
  expect(component.container).not.toHaveTextContent(
    'likes'
  )
})
test('checks that blog url and number of likes are shown when the button controlling the shown details has been clicked', () => {
  const blog = {
    title: 'This is a test',
    author: 'Jhon Doe',
    likes: 10,
    url: 'hackernews.com'
  }
  const component = render(
    <Blog blog={blog} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'hackernews.com'
  )
  expect(component.container).toHaveTextContent(
    'likes'
  )
  expect(component.container).toHaveTextContent(
    '10'
  )
})

test('ensures that if like button is clicked twice, the event handler the component received as props is called twice', () => {
  const blog = {
    title: 'This is a test',
    author: 'Jhon Doe',
    likes: 10,
    url: 'hackernews.com'
  }
  const mockHandler = jest.fn()
  const component = render(
    <Blog blog={blog} onClickUpdate={mockHandler} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)
  const btnLike = component.getByText('likes')
  fireEvent.click(btnLike)
  fireEvent.click(btnLike)
  expect(mockHandler.mock.calls).toHaveLength(2)
})

