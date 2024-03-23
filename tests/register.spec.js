import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker'

const USER_NAME = faker.internet.userName()
const LAST_NAME = faker.internet.userName()
const USER_EMAIL = faker.internet.email()
const NAME_COMPANY = faker.company.name()
const PASSWORD = faker.internet.password()

test('Given i want to register successfully', async ({ page }) => {
  // personal details
  await page.goto('/register')
  await expect(page.locator('#gender')).toBeVisible()
  await page.check('#gender-male')
  await page.fill('#FirstName', USER_NAME)
  await page.fill('#LastName', LAST_NAME)
  await page.locator('select', { hasText: 'Day' }).selectOption('20')
  await page.locator('select', { hasText: 'Month' }).selectOption('February')
  await page.locator('select', { hasText: 'Year' }).selectOption('1980')
  await page.fill('#Email', USER_EMAIL)

  //Company Details
  await page.fill('#Company', NAME_COMPANY)

  //Options
  await page.uncheck('#Newsletter')

  //Password
  await page.fill('#Password', PASSWORD)
  await page.fill('#ConfirmPassword', PASSWORD)

  //Register
  await page.click('#register-button')

  //Validate
  await expect(page.locator('h1', { hasText: 'Register' })).toBeVisible()
  await expect(page.locator('a.button-1.register-continue-button')).toBeVisible()
  await expect(page.locator('div.result', { hasText: 'Your registration completed' })).toBeVisible()
})

test('Given that I want to view the required fields', async ({ page }) => {
  await page.goto('/register')
  await expect(page.locator('#gender')).toBeVisible()

  //Register
  await page.click('#register-button')

  //Validate
  await expect(page.locator('#FirstName-error', { hasText: 'First name is required.' })).toBeVisible()
  await expect(page.locator('#LastName-error', { hasText: 'Last name is required.' })).toBeVisible()
  await expect(page.locator('#Email-error', { hasText: 'Email is required.' })).toBeVisible()
  await expect(page.locator('#Password-error', { hasText: 'Password is required.' })).toBeVisible()
  await expect(page.locator('#ConfirmPassword-error', { hasText: 'Password is required.' })).toBeVisible()
})