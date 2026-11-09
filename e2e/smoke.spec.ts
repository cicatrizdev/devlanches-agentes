import { expect, test } from '@playwright/test'

test('cardápio carrega com o título DevLanches', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /DevLanches/i })).toBeVisible()
  await expect(page.getByText('Seu pedido está vazio')).toBeVisible()
})
