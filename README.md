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

## Deployment

Push to `main` and GitHub Actions will build and deploy the site to GitHub Pages.

The Pages site is configured for workflow-based publishing, not branch-based publishing.

## DNS

The intended public host is `docs.yatsu.moe`.

For a GitHub Pages subdomain setup, create a DNS `CNAME` record pointing:

- `docs.yatsu.moe` -> `ytrms.github.io`

GitHub recommends verifying the custom domain as part of the setup to reduce takeover risk.