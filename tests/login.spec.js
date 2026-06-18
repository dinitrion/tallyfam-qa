const { test, expect } = require('@playwright/test');

test.describe('TallyFam - Login', () => {

  test('La página de login carga correctamente', async ({ page }) => {
    await page.goto('/auth.php');
    await expect(page).toHaveTitle(/TallyFam/i);
    await expect(page.locator('#loginEmail')).toBeVisible();
    await expect(page.locator('#loginPassword')).toBeVisible();
  });

  test('Error al login con credenciales incorrectas', async ({ page }) => {
    await page.goto('/auth.php');
    await page.fill('#loginEmail', 'falso@test.com');
    await page.fill('#loginPassword', 'claveincorrecta123');
    await page.click('#loginBtn');
    await expect(page.locator('#loginError, .error, [class*="error"]')).toBeVisible({ timeout: 10000 });
  });

  test('Login exitoso con credenciales válidas', async ({ page }) => {
    await page.goto('/auth.php');
    await page.fill('#loginEmail', 'test@tallyfam.com');
    await page.fill('#loginPassword', 'Zapato14#');
    await page.click('#loginBtn');
    await expect(page).toHaveURL(/dashboard|home|index|app/i, { timeout: 15000 });
  });

});