import { expect, test, type Page } from '@playwright/test'

async function irParaCheckout(page: Page) {
  const botaoAdicionar = page.getByRole('button', { name: 'Adicionar' }).first()
  await expect(botaoAdicionar).toBeVisible({ timeout: 15_000 })
  await botaoAdicionar.click()
  await page.getByTestId('botao-finalizar-pedido').click()
  await expect(page.getByTestId('tela-checkout')).toBeVisible()
}

test('aplica SEXTOU e mostra total com desconto', async ({ page }) => {
  await page.goto('/')
  await irParaCheckout(page)

  await page.getByTestId('input-cupom').fill('SEXTOU')
  await page.getByTestId('botao-aplicar-cupom').click()

  await expect(page.getByTestId('linha-desconto')).toBeVisible()
  await expect(page.getByTestId('linha-desconto')).toContainText('SEXTOU')
  await expect(page.getByTestId('botao-remover-cupom')).toBeVisible()

  // Prova visual: checkout com desconto aplicado
  await page.getByTestId('tela-checkout').screenshot({ path: 'docs/prova-cupom.png' })
})

test('cupom inválido mostra Cupom inválido', async ({ page }) => {
  await page.goto('/')
  await irParaCheckout(page)

  await page.getByTestId('input-cupom').fill('NADA')
  await page.getByTestId('botao-aplicar-cupom').click()
  await expect(page.getByTestId('erro-cupom')).toHaveText('Cupom inválido')
})

test('pedido vazio não aceita cupom', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Seu pedido está vazio')).toBeVisible()
  await expect(page.getByTestId('botao-finalizar-pedido')).toBeDisabled()
  await expect(page.getByTestId('input-cupom')).toHaveCount(0)
})

test('dá pra remover o cupom aplicado', async ({ page }) => {
  await page.goto('/')
  await irParaCheckout(page)

  await page.getByTestId('input-cupom').fill('PRIMEIROPR')
  await page.getByTestId('botao-aplicar-cupom').click()
  await expect(page.getByTestId('linha-desconto')).toBeVisible()

  await page.getByTestId('botao-remover-cupom').click()
  await expect(page.getByTestId('linha-desconto')).toHaveCount(0)
  await expect(page.getByTestId('botao-aplicar-cupom')).toBeVisible()
})
