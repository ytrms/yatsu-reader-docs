#!/usr/bin/env python3
"""Notify IndexNow about changed production pages, using only Python's stdlib."""

import argparse
from concurrent.futures import ThreadPoolExecutor
import hashlib
import json
import os
from pathlib import Path
import re
import time
from urllib.error import HTTPError, URLError
from urllib.parse import urlsplit
from urllib.request import Request, urlopen
import xml.etree.ElementTree as ET


ENDPOINT = "https://api.indexnow.org/indexnow"
NS = "{http://www.sitemaps.org/schemas/sitemap/0.9}"
ALLOWED_SITES = {"https://yatsu.moe", "https://docs.yatsu.moe"}


def request(url, payload=None):
    """Retry transient network/server errors, including key propagation delays."""
    headers = {"User-Agent": "Yatsu-IndexNow/1.0", "Cache-Control": "no-cache"}
    if payload is not None:
        headers["Content-Type"] = "application/json; charset=utf-8"
    for attempt in range(5):
        try:
            with urlopen(Request(url, data=payload, headers=headers), timeout=30) as response:
                if response.url != url:
                    raise ValueError(f"Unexpected redirect: {url} -> {response.url}")
                return response.status, response.read()
        except HTTPError as error:
            retryable = error.code in {429, 500, 502, 503, 504}
            retryable |= payload is None and error.code == 404
            if not retryable or attempt == 4:
                raise
        except (URLError, TimeoutError):
            if attempt == 4:
                raise
        time.sleep(min(5 * 2**attempt, 30))
    raise RuntimeError("Request failed")


def validate_url(url, site):
    parsed = urlsplit(url)
    if (
        parsed.scheme != "https"
        or parsed.netloc != urlsplit(site).netloc
        or parsed.fragment
        or parsed.username
        or len(url) > 2048
    ):
        raise ValueError(f"Not a canonical URL on {site}: {url}")
    return url


def sitemap_urls(xml, site):
    root = ET.fromstring(xml)
    if root.tag != f"{NS}urlset":
        raise ValueError("Expected a sitemap urlset")
    urls = sorted({validate_url(node.text.strip(), site) for node in root.findall(f"{NS}url/{NS}loc") if node.text})
    if not urls or len(urls) > 10000:
        raise ValueError("Expected between 1 and 10,000 sitemap URLs")
    return urls


def load_state(path, site):
    if not path.exists():
        return {}
    state = json.loads(path.read_text())
    if state.get("site") != site or state.get("version") != 1:
        raise ValueError("IndexNow state belongs to a different site or version")
    pages = state["pages"]
    for url, digest in pages.items():
        validate_url(url, site)
        if not isinstance(digest, str) or not re.fullmatch(r"[a-f0-9]{64}", digest):
            raise ValueError("Invalid page fingerprint in IndexNow state")
    return pages


def changed_urls(previous, current):
    # Include disappeared sitemap entries so crawlers can discover removals/redirects.
    return sorted(url for url in previous.keys() | current.keys() if previous.get(url) != current.get(url))


def notify(site, key_file, state_file, dry_run=False):
    if site not in ALLOWED_SITES:
        raise ValueError("Only Yatsu's production website and docs are supported")
    key = key_file.read_text().strip()
    if not re.fullmatch(r"[A-Za-z0-9-]{8,128}", key):
        raise ValueError("Invalid IndexNow key")
    key_location = f"{site}/{key_file.name}"
    _, live_key = request(key_location)
    if live_key.decode("utf-8-sig").strip() != key:
        raise ValueError("Production has not published the expected IndexNow key")

    _, sitemap = request(f"{site}/sitemap.xml")
    urls = sitemap_urls(sitemap, site)
    previous = load_state(state_file, site)

    def fingerprint(url):
        _, body = request(url)
        return url, hashlib.sha256(body).hexdigest()

    with ThreadPoolExecutor(max_workers=4) as pool:
        current = dict(pool.map(fingerprint, urls))
    changed = changed_urls(previous, current)
    print(f"{site}: {len(current)} live pages; {len(changed)} new, changed, or removed URLs.")
    for url in changed:
        print(f"  {url}")
    if dry_run:
        print("Dry run: no notifications sent and no state saved.")
        return

    if changed:
        # A 200/202 acknowledges receipt, not indexing or ranking.
        for start in range(0, len(changed), 10000):
            payload = json.dumps({
                "host": urlsplit(site).netloc,
                "key": key,
                "keyLocation": key_location,
                "urlList": changed[start:start + 10000],
            }).encode()
            status, _ = request(ENDPOINT, payload)
            if status not in {200, 202}:
                raise RuntimeError(f"IndexNow rejected submission: HTTP {status}")
            print(f"IndexNow accepted submission: HTTP {status}" + (" (key validation pending)" if status == 202 else ""))
    else:
        print("No content changes; skipping IndexNow submission.")

    # Keep the last acknowledged snapshot on failure so the next run can retry.
    state_file.parent.mkdir(parents=True, exist_ok=True)
    temporary = state_file.with_suffix(".tmp")
    temporary.write_text(json.dumps({"version": 1, "site": site, "pages": current}, indent=2) + "\n")
    temporary.replace(state_file)
    summary = os.environ.get("GITHUB_STEP_SUMMARY")
    if summary:
        with open(summary, "a") as output:
            output.write(f"IndexNow: **{len(changed)} URLs** notified for {site}; {len(current)} live pages checked.\n")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--site", required=True)
    parser.add_argument("--key-file", type=Path, required=True)
    parser.add_argument("--state", type=Path, default=Path(".indexnow/state.json"))
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()
    notify(args.site.rstrip("/"), args.key_file, args.state, args.dry_run)
