import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import Blog from './Blog'

const blog = {
  title: 'testing react components',
  author: 'test author',
  url: 'https://example.com/testing',
  likes: 5,
  user: {
    name: 'test user',
    username: 'testuser',
  },
}

test('shows title and author while details are hidden', () => {
  render(<Blog blog={blog} handleLike={() => {}} handleRemove={() => {}} />)

  expect(screen.getByText('testing react components test author')).toBeVisible()
  expect(screen.getByText('https://example.com/testing')).not.toBeVisible()
  expect(screen.getByText('likes 5')).not.toBeVisible()
})

test('shows url, likes and user after view is clicked', async () => {
  const user = userEvent.setup()
  render(<Blog blog={blog} handleLike={() => {}} handleRemove={() => {}} />)

  await user.click(screen.getByRole('button', { name: 'view' }))

  expect(screen.getByText('https://example.com/testing')).toBeVisible()
  expect(screen.getByText('likes 5')).toBeVisible()
  expect(screen.getByText('test user')).toBeVisible()
})

test('calls the like handler twice', async () => {
  const user = userEvent.setup()
  const handleLike = vi.fn()
  render(<Blog blog={blog} handleLike={handleLike} handleRemove={() => {}} />)

  await user.click(screen.getByRole('button', { name: 'view' }))
  await user.click(screen.getByRole('button', { name: 'like' }))
  await user.click(screen.getByRole('button', { name: 'like' }))

  expect(handleLike).toHaveBeenCalledTimes(2)
})
