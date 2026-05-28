# Yatsu Reader Docs

This repository hosts the documentation site for [Yatsu Reader](https://app.yatsu.moe).

The site is built with MkDocs and Material for MkDocs, deployed with GitHub Actions, and served via GitHub Pages at `docs.yatsu.moe`.

## Stack

- MkDocs
- Material for MkDocs
- GitHub Actions
- GitHub Pages

## Local development

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
mkdocs serve
```

The local preview runs at `http://127.0.0.1:8000/`.

## Refreshing screenshots

Start the sibling Yatsu app first:

```bash
cd ../ebook-reader
pnpm --filter web dev -- --host 127.0.0.1 --port 5174
```

Then capture the documentation screenshots from this repo:

```bash
node scripts/capture-yatsu-screenshots.mjs
```

The script saves screenshots into `docs/assets/` and seeds the temporary browser
context with sample books from `../yatsu-themes/sample-books`.

## Deployment

Push to `main` and GitHub Actions will build and deploy the site to GitHub Pages.

The Pages site is configured for workflow-based publishing, not branch-based publishing.

## DNS

The intended public host is `docs.yatsu.moe`.

For a GitHub Pages subdomain setup, create a DNS `CNAME` record pointing:

- `docs.yatsu.moe` -> `ytrms.github.io`

GitHub recommends verifying the custom domain as part of the setup to reduce takeover risk.
