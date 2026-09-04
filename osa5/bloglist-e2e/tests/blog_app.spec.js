const { test, expect } = require('@playwright/test')

const login = async page => {
  await page.getByLabel('username').fill('testuser')
  await page.getByLabel('password').fill('secret123')
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async page => {
  await page.getByRole('button', { name: 'create new blog' }).click()
  await page.getByLabel('title').fill('playwright finds browser bugs')
  await page.getByLabel('author').fill('test author')
  await page.getByLabel('url').fill('https://example.com/playwright')
  await page.getByRole('button', { name: 'create', exact: true }).click()
}

test.describe('blog app', () => {
  test.beforeEach(async ({ page, request }) => {
    // tietokanta nollataan ennen testiä
    const resetResponse = await request.post('http://127.0.0.1:3004/api/testing/reset')
    expect(resetResponse.status()).toBe(204)

    const userResponse = await request.post('http://127.0.0.1:3004/api/users', {
      data: {
        username: 'testuser',
        name: 'test user',
        password: 'secret123',
      },
    })
    expect(userResponse.status()).toBe(201)
    await page.goto('/')
  })

  test('login form is shown', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'log in to application' })).toBeVisible()
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
  })

  test.describe('login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await login(page)

      await expect(page.getByText('test user logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('username').fill('testuser')
      await page.getByLabel('password').fill('wrong-password')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByRole('status')).toContainText('wrong username or password')
    })
  })

  test.describe('when logged in', () => {
    test.beforeEach(async ({ page }) => {
      await login(page)
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page)

      await expect(page.getByText('playwright finds browser bugs test author')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await createBlog(page)
      const blog = page.locator('.blog').filter({ hasText: 'playwright finds browser bugs' })
      await blog.getByRole('button', { name: 'view' }).click()
      await blog.getByRole('button', { name: 'like' }).click()

      await expect(blog.getByText('likes 1')).toBeVisible()
    })
  })
})
