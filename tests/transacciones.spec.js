const { test, expect } = require('@playwright/test');

test.describe('TallyFam - Transacciones', () => {

  test.skip(({ browserName }) => browserName === 'webkit', 'Safari webkit - issue conocido con React+Firebase');

  test.beforeEach(async ({ page }) => {
    await page.goto('/auth.php');
    await page.fill('#loginEmail', 'test@tallyfam.com');
    await page.fill('#loginPassword', 'Zapato14#');
    await page.click('#loginBtn');
    await expect(page).toHaveURL(/index\.php/i, { timeout: 15000 });
    await page.locator('div.min-h-screen').waitFor({ timeout: 20000 });
    await page.waitForTimeout(5000);
  });

  test('Formulario de gasto es accesible', async ({ page }) => {
    await page.locator('button:has-text("Gasto")').first().click();
    await expect(page.locator('input[placeholder="0.00"]').first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator('input[type="date"]').first()).toBeVisible();
  });

  test('Error al registrar gasto sin monto', async ({ page }) => {
    await page.locator('button:has-text("Gasto")').first().click();
    await page.locator('button:has-text("Transacci")').first().click();
    await expect(page.locator('.bg-red-50.border-red-200').first()).toBeVisible({ timeout: 10000 });
  });

  test('Registro exitoso de un gasto', async ({ page }) => {
    await page.locator('button:has-text("Gasto")').first().click();
    await page.evaluate(() => {
      window.__setFormField('monto', '25.50');
      window.__setFormField('categoria', 'Vivienda');
      window.__setFormField('descripcion', 'Test gasto Playwright');
    });
    await page.waitForTimeout(500);
    await page.locator('button:has-text("Transacci")').first().click();
    await expect(page.locator('.bg-red-50.border-red-200').first()).not.toBeVisible({ timeout: 10000 });
  });

  test('Formulario de ingreso es accesible', async ({ page }) => {
    await page.locator('button:has-text("Ingreso")').first().click();
    await expect(page.locator('input[placeholder="0.00"]').first()).toBeVisible({ timeout: 10000 });
  });

  test('Error al registrar ingreso sin monto', async ({ page }) => {
    await page.locator('button:has-text("Ingreso")').first().click();
    await page.locator('button:has-text("Transacci")').first().click();
    await expect(page.locator('.bg-red-50.border-red-200').first()).toBeVisible({ timeout: 10000 });
  });

  test('Registro exitoso de un ingreso', async ({ page }) => {
    await page.locator('button:has-text("Ingreso")').first().click();
    await page.evaluate(() => {
      window.__setFormField('monto', '1000.00');
      window.__setFormField('descripcion', 'Test ingreso Playwright');
    });
    await page.waitForTimeout(500);
    await page.locator('button:has-text("Transacci")').first().click();
    await expect(page.locator('.bg-red-50.border-red-200').first()).not.toBeVisible({ timeout: 10000 });
  });

});
