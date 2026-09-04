import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import BlogForm from './BlogForm'

test('submits title, author and url', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()
  render(<BlogForm createBlog={createBlog} />)

  await user.type(screen.getByLabelText('title'), 'a tested form')
  await user.type(screen.getByLabelText('author'), 'form author')
  await user.type(screen.getByLabelText('url'), 'https://example.com/form')
  await user.click(screen.getByRole('button', { name: 'create' }))

  expect(createBlog).toHaveBeenCalledOnce()
  expect(createBlog).toHaveBeenCalledWith({
    title: 'a tested form',
    author: 'form author',
    url: 'https://example.com/form',
  })
})
