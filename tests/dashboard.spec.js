const { test, expect } = require('@playwright/test');

test.describe('TallyFam - Dashboard', () => {

  test.skip(({ browserName }) => browserName === 'webkit', 'Safari tarda demasiado cargando React+Firebase - issue conocido');

  test.beforeEach(async ({ page }) => {
    await page.goto('/auth.php');
    await page.fill('#loginEmail', 'test@tallyfam.com');
    await page.fill('#loginPassword', 'Zapato14#');
    await page.click('#loginBtn');
    await expect(page).toHaveURL(/index\.php/i, { timeout: 15000 });
    await page.locator('div.min-h-screen').waitFor({ timeout: 20000 });
  });

  test('Dashboard carga correctamente tras login', async ({ page }) => {
    await expect(page.locator('h1')).toBeVisible({ timeout: 20000 });
  });

  test('Boton Añadir Transaccion es visible', async ({ page }) => {
    await expect(page.locator('button:has-text("Transacci")').first()).toBeVisible({ timeout: 20000 });
  });

  test('Tabs Gasto e Ingreso son visibles', async ({ page }) => {
    await expect(page.locator('button:has-text("Gasto")').first()).toBeVisible({ timeout: 20000 });
    await expect(page.locator('button:has-text("Ingreso")').first()).toBeVisible({ timeout: 20000 });
  });

  test('Botones de exportacion CSV y PDF son visibles', async ({ page }) => {
    await expect(page.locator('button:has-text("CSV")').first()).toBeVisible({ timeout: 20000 });
    await expect(page.locator('button:has-text("PDF")').first()).toBeVisible({ timeout: 20000 });
  });

  test('Funciones de IA son visibles', async ({ page }) => {
    await expect(page.locator('button:has-text("Escanear")').first()).toBeVisible({ timeout: 20000 });
    await expect(page.locator('button:has-text("Dictar")').first()).toBeVisible({ timeout: 20000 });
  });

});
