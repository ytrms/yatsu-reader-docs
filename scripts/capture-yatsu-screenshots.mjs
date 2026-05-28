#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), '..');

const viewport = {
  width: Number(process.env.YATSU_SCREENSHOT_WIDTH || 1440),
  height: Number(process.env.YATSU_SCREENSHOT_HEIGHT || 900)
};

const config = {
  baseUrl: (process.env.YATSU_APP_URL || 'http://127.0.0.1:5174').replace(/\/$/, ''),
  appDir: path.resolve(repoRoot, process.env.YATSU_APP_DIR || '../ebook-reader'),
  docsAssetsDir: path.resolve(repoRoot, process.env.YATSU_DOCS_ASSETS_DIR || 'docs/assets'),
  sampleBooksDir: path.resolve(repoRoot, process.env.YATSU_SAMPLE_BOOKS_DIR || '../yatsu-themes/sample-books'),
  sampleBookLimit: Number(process.env.YATSU_SAMPLE_BOOK_LIMIT || 6),
  skipImport: process.env.YATSU_SKIP_IMPORT === '1'
};

if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`Capture Yatsu documentation screenshots from a running local app.

Usage:
  node scripts/capture-yatsu-screenshots.mjs

Before running, start the app in the sibling ebook-reader repo:
  pnpm --filter web dev -- --host 127.0.0.1 --port 5174

Environment:
  YATSU_APP_URL                 App URL. Default: http://127.0.0.1:5174
  YATSU_APP_DIR                 App repo used to resolve Playwright. Default: ../ebook-reader
  YATSU_DOCS_ASSETS_DIR         Screenshot output directory. Default: docs/assets
  YATSU_SAMPLE_BOOKS_DIR        Directory containing sample books. Default: ../yatsu-themes/sample-books
  YATSU_SAMPLE_BOOK_LIMIT       Maximum imported sample books. Default: 6
  YATSU_SKIP_IMPORT=1           Skip file import and use the current browser context only
  YATSU_SCREENSHOT_WIDTH        Viewport width. Default: 1440
  YATSU_SCREENSHOT_HEIGHT       Viewport height. Default: 900
`);
  process.exit(0);
}

function normalizePlaywrightModule(moduleNamespace) {
  return moduleNamespace.chromium ? moduleNamespace : moduleNamespace.default;
}

async function importModulePath(modulePath) {
  return normalizePlaywrightModule(await import(pathToFileURL(modulePath).href));
}

async function loadPlaywright() {
  if (process.env.YATSU_PLAYWRIGHT_MODULE) {
    return importModulePath(path.resolve(repoRoot, process.env.YATSU_PLAYWRIGHT_MODULE));
  }

  try {
    return normalizePlaywrightModule(await import('playwright'));
  } catch {
    // Fall back to the sibling app dependencies. The docs repo intentionally
    // does not need its own Node toolchain just to refresh screenshots.
  }

  const appManifests = [
    path.join(config.appDir, 'package.json'),
    path.join(config.appDir, 'apps/web/package.json')
  ];
  const errors = [];

  for (const manifest of appManifests) {
    try {
      const requireFromApp = createRequire(manifest);
      return importModulePath(requireFromApp.resolve('playwright'));
    } catch (error) {
      errors.push(`${manifest}: ${error.message}`);
    }
  }

  throw new Error(
    `Could not load Playwright. Install dependencies in ${config.appDir}, ` +
      'install Playwright in this repo, or set YATSU_PLAYWRIGHT_MODULE. ' +
      `Tried: ${errors.join(' | ')}`
  );
}

async function collectSampleBooks(rootDir) {
  const files = [];

  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
        continue;
      }
      if (!entry.isFile()) {
        continue;
      }
      const ext = path.extname(entry.name).toLowerCase();
      if (ext === '.epub' || ext === '.htmlz' || ext === '.txt') {
        files.push(fullPath);
      }
    }
  }

  await walk(rootDir);

  const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
  files.sort((a, b) => collator.compare(path.relative(rootDir, a), path.relative(rootDir, b)));
  return files.slice(0, config.sampleBookLimit);
}

function appUrl(route) {
  return new URL(route, `${config.baseUrl}/`).href;
}

async function main() {
  const { chromium } = await loadPlaywright();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    colorScheme: 'light',
    reducedMotion: 'reduce'
  });
  const page = await context.newPage();
  page.setDefaultTimeout(15000);

  async function goto(route) {
    await page.goto(appUrl(route), { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(600);
  }

  async function screenshot(name, options = {}) {
    await fs.mkdir(config.docsAssetsDir, { recursive: true });
    await page.mouse.move(viewport.width - 4, viewport.height - 4).catch(() => {});
    await page.waitForTimeout(120);
    await page.screenshot({
      path: path.join(config.docsAssetsDir, name),
      fullPage: false,
      animations: 'disabled',
      ...options
    });
    console.log(`saved ${name}`);
  }

  async function safeClick(locator, label) {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
    await page.waitForTimeout(350);
    console.log(`clicked ${label}`);
  }

  async function openImportMenu() {
    await safeClick(page.getByRole('button', { name: 'Import', exact: true }), 'Import');
  }

  async function importSampleBooks() {
    if (config.skipImport) {
      return;
    }

    const sampleBooks = await collectSampleBooks(config.sampleBooksDir);
    if (sampleBooks.length === 0) {
      throw new Error(`No sample books found in ${config.sampleBooksDir}`);
    }

    await goto('/library');
    await openImportMenu();
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: 'Import File(s) EPUB, HTMLZ, and text files' }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(sampleBooks);
    await page.waitForTimeout(4000);
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(1000);
  }

  async function openLibraryDisplaySettings() {
    await goto('/library');
    await safeClick(page.getByRole('button', { name: 'Open Library display settings' }), 'Library display settings');
  }

  async function openMoreLibraryActions() {
    await goto('/library');
    await safeClick(page.locator('[title="More options"]').first(), 'More library actions');
  }

  async function openLibrarySelectMode() {
    await goto('/library');
    const firstCard = page.locator('[data-library-book-card-id]').first();
    await firstCard.hover();
    await firstCard.getByRole('button', { name: 'Select book' }).click();
    await page.waitForTimeout(500);
  }

  async function openBugReportDialog() {
    await openMoreLibraryActions();
    await page.getByRole('button', { name: 'Report a bug' }).click();
    await page.waitForTimeout(700);
  }

  async function advanceReaderToTextPage() {
    await page.mouse.click(Math.floor(viewport.width / 2), Math.floor(viewport.height / 2));
    for (let i = 0; i < 40; i += 1) {
      const visibleReaderText = await page.evaluate(() => {
        const reader = document.querySelector('.reader-route-content');
        const text = reader instanceof HTMLElement ? reader.innerText : '';
        return text.replace(/\s+/g, '');
      });
      if (visibleReaderText.length > 120) {
        break;
      }
      await page.keyboard.press('PageDown');
      await page.waitForTimeout(450);
    }
  }

  async function showReaderToolbar() {
    const showToolbar = page.getByRole('button', { name: 'Show reader toolbar' });
    if (await showToolbar.isVisible().catch(() => false)) {
      await showToolbar.click().catch(async () => {
        await page.mouse.click(Math.floor(viewport.width / 2), 10);
      });
    }
    await page.locator('.reader-desktop-header-shell').waitFor({ state: 'visible', timeout: 5000 });
    await page.waitForTimeout(500);
  }

  async function openReader() {
    await goto('/library');
    await page.locator('[data-book-card-button]').first().click();
    await page.waitForURL(/\/b\?id=/, { timeout: 20000 });
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(2000);
    await advanceReaderToTextPage();
    await showReaderToolbar();
  }

  async function openReaderAppearance() {
    await openReader();
    await safeClick(page.locator('.reader-desktop-header-shell [aria-label="Open Quick Settings"]:visible'), 'Appearance');
  }

  async function openReaderBookmarks() {
    await openReader();
    await safeClick(page.locator('.reader-desktop-header-shell [aria-label="Open bookmarks"]:visible'), 'Bookmarks');
  }

  async function openReaderMoreActions() {
    await openReader();
    await safeClick(page.locator('.reader-desktop-header-shell [title="More reader actions"]:visible').first(), 'More reader actions');
  }

  async function openSettings(route) {
    await goto(route);
  }

  async function openSettingsGroup(route, groupName) {
    await openSettings(route);
    await safeClick(page.getByRole('button', { name: groupName, exact: true }), `Settings ${groupName}`);
  }

  try {
    await importSampleBooks();

    await goto('/library');
    await screenshot('yatsu-library-overview.png');

    await openImportMenu();
    await screenshot('yatsu-library-import-menu.png');

    await openLibrarySelectMode();
    await screenshot('yatsu-library-select-mode.png');

    await openLibraryDisplaySettings();
    await screenshot('yatsu-library-display-settings.png');

    await openMoreLibraryActions();
    await screenshot('yatsu-library-more-actions.png');

    await openBugReportDialog();
    await screenshot('yatsu-bug-report-dialog.png');

    await openReader();
    await screenshot('yatsu-reader-controls.png');

    await openReaderAppearance();
    await screenshot('yatsu-reader-appearance-panel.png');

    await openReaderBookmarks();
    await screenshot('yatsu-reader-bookmarks-panel.png');

    await openReaderMoreActions();
    await screenshot('yatsu-reader-more-actions.png');

    await openSettings('/settings?section=data');
    await screenshot('yatsu-settings-data.png');

    await openSettingsGroup('/settings?section=data', 'Sources');
    await screenshot('yatsu-settings-sync-sources.png');

    await openSettings('/settings?section=tracking');
    await screenshot('yatsu-settings-tracking.png');

    await goto('/statistics');
    await screenshot('yatsu-statistics-overview.png');
    await safeClick(page.getByRole('button', { name: 'Open display options' }), 'Statistics display options');
    await screenshot('yatsu-statistics-display-options.png');
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
