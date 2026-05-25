import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '../docs/screenshots');
const baseUrl = process.env.SCREENSHOT_BASE_URL ?? 'https://chiral-network.vercel.app';

const pages = [
  { name: 'download', path: '/download' },
  { name: 'upload', path: '/upload' },
  { name: 'network', path: '/network' },
  { name: 'reputation', path: '/reputation' },
  { name: 'analytics', path: '/analytics' },
  { name: 'mining', path: '/mining' },
  { name: 'settings', path: '/settings' },
  { name: 'account', path: '/account' },
];

async function dismissWalletModal(page) {
  const testWallet = page.getByRole('button', {
    name: /Create Test Wallet/i,
  });
  if (await testWallet.isVisible({ timeout: 3000 }).catch(() => false)) {
    await testWallet.click();
    await page.waitForTimeout(800);
  }
}

async function main() {
  await mkdir(outDir, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  await dismissWalletModal(page);

  for (const { name, path: route } of pages) {
    await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(outDir, `${name}.png`),
      fullPage: true,
    });
    console.log(`Saved ${name}.png`);
  }

  await page.goto(`${baseUrl}/download`, { waitUntil: 'networkidle' });
  await dismissWalletModal(page);
  const menuButton = page.locator('button').filter({ has: page.locator('svg') }).first();
  await menuButton.click({ timeout: 5000 }).catch(() => {});
  await page.waitForTimeout(400);
  await page.screenshot({
    path: path.join(outDir, 'navigation.png'),
    fullPage: false,
  });
  console.log('Saved navigation.png');

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
