import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '../docs/screenshots');
const baseUrl = process.env.SCREENSHOT_BASE_URL ?? 'https://chiral-network.vercel.app';

/** Navigate via sidebar (SPA) so wallet state persists across pages. */
const pages = [
  {
    name: 'download',
    nav: 'Download',
    heading: 'Download Files',
    scrollTo: 'Restartable HTTP Download',
  },
  {
    name: 'upload',
    nav: 'Upload',
    heading: 'Upload Files',
    scrollTo: 'Shared Files',
  },
  {
    name: 'network',
    nav: 'Network',
    heading: 'Network',
    scrollTo: 'DHT Network',
  },
  {
    name: 'reputation',
    nav: 'Reputation',
    heading: 'Reputation System',
    scrollTo: 'Trust Level Distribution',
  },
  {
    name: 'analytics',
    nav: 'Analytics',
    heading: 'Analytics Dashboard',
    scrollTo: null,
  },
  {
    name: 'mining',
    nav: 'Mining',
    heading: 'Mining',
    scrollTo: 'Profitability Calculator',
  },
  {
    name: 'account',
    nav: 'Account',
    heading: 'Account',
    scrollTo: 'Chiral Network Wallet',
  },
  {
    name: 'settings',
    nav: 'Settings',
    heading: 'Settings',
    scrollTo: null,
  },
];

async function waitForToastsToClear(page) {
  // SimpleToast auto-dismisses after 3s
  await page.waitForTimeout(3500);
  await page
    .locator('.fixed.top-4.right-4 .bg-green-600')
    .waitFor({ state: 'hidden', timeout: 2000 })
    .catch(() => {});
}

async function dismissWalletModal(page) {
  const welcome = page.getByRole('heading', { name: 'Welcome to Chiral Network!' });
  if (!(await welcome.isVisible({ timeout: 1500 }).catch(() => false))) {
    return;
  }
  await page.getByRole('button', { name: /Create Test Wallet/i }).click();
  await welcome.waitFor({ state: 'hidden', timeout: 15000 });
  await page.waitForTimeout(600);
}

async function clickSidebar(page, label) {
  const sidebar = page.locator('aside nav, .hidden.md\\:block nav').first();
  await sidebar.getByRole('button', { name: label, exact: true }).click();
}

async function capturePage(page, { name, nav, heading, scrollTo }) {
  await clickSidebar(page, nav);
  await page.getByRole('heading', { name: heading, level: 1 }).waitFor({
    state: 'visible',
    timeout: 15000,
  });
  await page.waitForTimeout(400);

  if (scrollTo) {
    const section = page.getByRole('heading', { name: scrollTo }).first();
    if (await section.isVisible({ timeout: 2000 }).catch(() => false)) {
      await section.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
    }
  }

  await page.screenshot({
    path: path.join(outDir, `${name}.png`),
    fullPage: false,
  });
  console.log(`Saved ${name}.png (${heading})`);
}

async function captureNavigation(page) {
  await clickSidebar(page, 'Download');
  await page.getByRole('heading', { name: 'Download Files', level: 1 }).waitFor();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('div.absolute.top-2.right-2.md\\:hidden button').click();
  await page.getByRole('button', { name: 'Close sidebar menu' }).waitFor({
    state: 'visible',
    timeout: 5000,
  });
  await page.waitForTimeout(400);
  await page.screenshot({
    path: path.join(outDir, 'navigation.png'),
    fullPage: false,
  });
  console.log('Saved navigation.png');
  await page.setViewportSize({ width: 1440, height: 900 });
}

async function main() {
  await mkdir(outDir, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    locale: 'en-US',
  });
  const page = await context.newPage();

  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  await dismissWalletModal(page);
  await waitForToastsToClear(page);

  for (const entry of pages) {
    await capturePage(page, entry);
  }

  await captureNavigation(page);
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
