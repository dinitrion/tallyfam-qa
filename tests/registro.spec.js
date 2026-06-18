const { test, expect } = require('@playwright/test');

test.describe('TallyFam - Registro', () => {

  test('Formulario de registro es accesible', async ({ page }) => {
    await page.goto('/auth.php');
    await page.locator('[data-tab="register"]').click();
    await expect(page.locator('#registerName')).toBeVisible();
    await expect(page.locator('#registerEmail')).toBeVisible();
    await expect(page.locator('#registerPassword')).toBeVisible();
    await expect(page.locator('#registerPasswordConfirm')).toBeVisible();
  });

  test('Error al registrar con contrasenas no coinciden', async ({ page }) => {
    await page.goto('/auth.php');
    await page.locator('[data-tab="register"]').click();
    await page.fill('#registerName', 'Usuario Test');
    await page.fill('#registerEmail', `test_${Date.now()}@tallyfam.com`);
    await page.fill('#registerPassword', 'Zapato14#');
    await page.fill('#registerPasswordConfirm', 'ClaveDistinta#');
    await page.click('#registerBtn');
    await expect(page.locator('#registerError')).toBeVisible({ timeout: 10000 });
  });

  test('Error al registrar con contrasena muy corta', async ({ page }) => {
    await page.goto('/auth.php');
    await page.locator('[data-tab="register"]').click();
    await page.fill('#registerName', 'Usuario Test');
    await page.fill('#registerEmail', `test_${Date.now()}@tallyfam.com`);
    await page.fill('#registerPassword', '123');
    await page.fill('#registerPasswordConfirm', '123');
    await page.click('#registerBtn');
    await expect(page.locator('#registerError')).toBeVisible({ timeout: 10000 });
  });

  test('Registro exitoso con datos validos', async ({ page }) => {
    await page.goto('/auth.php');
    await page.locator('[data-tab="register"]').click();
    await page.fill('#registerName', 'Usuario Test');
    await page.fill('#registerEmail', `test_${Date.now()}@tallyfam.com`);
    await page.fill('#registerPassword', 'Zapato14#');
    await page.fill('#registerPasswordConfirm', 'Zapato14#');
    await page.click('#registerBtn');
    await expect(page).toHaveURL(/dashboard|home|index|app/i, { timeout: 20000 });
  });

});
