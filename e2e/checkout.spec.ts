import { expect, test } from '@playwright/test'

test('Finalizar pedido fica desabilitado com o pedido vazio', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Seu pedido está vazio')).toBeVisible()
  await expect(page.getByTestId('botao-finalizar-pedido')).toBeDisabled()
})

test('checkout lista itens agrupados, confirma e esvazia o pedido', async ({ page }) => {
  await page.goto('/')

  const botaoAdicionar = page.getByRole('button', { name: 'Adicionar' }).first()
  await expect(botaoAdicionar).toBeVisible({ timeout: 15_000 })
  await botaoAdicionar.click()
  await botaoAdicionar.click()

  await expect(page.getByText(/2 itens no pedido/)).toBeVisible()

  await page.getByTestId('botao-finalizar-pedido').click()
  await expect(page.getByTestId('tela-checkout')).toBeVisible()
  await expect(page.getByTestId('item-pedido')).toHaveCount(1)
  await expect(page.getByTestId('item-pedido')).toContainText('2× Big Deploy')

  // Prova visual: checkout com o pedido agrupado
  await page.getByTestId('tela-checkout').screenshot({ path: 'docs/prova-checkout.png' })

  await page.getByTestId('botao-confirmar-pedido').click()
  await expect(page.getByTestId('tela-confirmado')).toBeVisible()
  await expect(page.getByText('Pedido confirmado')).toBeVisible()
  await expect(page.getByTestId('total-confirmado')).toBeVisible()

  await page.getByTestId('botao-voltar-cardapio').click()
  await expect(page.getByText('Seu pedido está vazio')).toBeVisible()
})

test('voltar ao cardápio mantém o pedido', async ({ page }) => {
  await page.goto('/')

  const botaoAdicionar = page.getByRole('button', { name: 'Adicionar' }).first()
  await expect(botaoAdicionar).toBeVisible({ timeout: 15_000 })
  await botaoAdicionar.click()

  await page.getByTestId('botao-finalizar-pedido').click()
  await expect(page.getByTestId('tela-checkout')).toBeVisible()

  await page.getByTestId('botao-voltar-cardapio').click()
  await expect(page.getByText(/1 item no pedido/)).toBeVisible()
  await expect(page.getByRole('heading', { name: /DevLanches/i })).toBeVisible()
})
