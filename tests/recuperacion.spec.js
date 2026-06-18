const { test, expect } = require('@playwright/test');

test.describe('TallyFam - Recuperacion de contrasena', () => {

  test('Modal de recuperacion se abre correctamente', async ({ page }) => {
    await page.goto('/auth.php');
    await page.locator('button[onclick="openResetModal()"]').click();
    await expect(page.locator('#resetModal')).toBeVisible();
    await expect(page.locator('#resetEmail')).toBeVisible();
    await expect(page.locator('#resetBtn')).toBeVisible();
  });

  test('Error al enviar email vacio', async ({ page }) => {
    await page.goto('/auth.php');
    await page.locator('button[onclick="openResetModal()"]').click();
    await expect(page.locator('#resetModal')).toBeVisible();
    await page.click('#resetBtn');
    await expect(page.locator('#resetError')).toBeVisible({ timeout: 10000 });
  });

  test('Error al enviar email invalido', async ({ page }) => {
    await page.goto('/auth.php');
    await page.locator('button[onclick="openResetModal()"]').click();
    await expect(page.locator('#resetModal')).toBeVisible();
    await page.fill('#resetEmail', 'esto-no-es-un-email');
    await page.click('#resetBtn');
    await expect(page.locator('#resetError')).toBeVisible({ timeout: 10000 });
  });

  test('Envio exitoso con email valido', async ({ page }) => {
    await page.goto('/auth.php');
    await page.locator('button[onclick="openResetModal()"]').click();
    await expect(page.locator('#resetModal')).toBeVisible();
    await page.fill('#resetEmail', 'test@tallyfam.com');
    await page.click('#resetBtn');
    await expect(page.locator('#resetBtnText')).toHaveText(/sent|enviado/i, { timeout: 15000 });
  });

});
