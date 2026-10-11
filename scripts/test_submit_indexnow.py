import hashlib
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

import submit_indexnow as indexnow


SITE = "https://yatsu.moe"
KEY = "a" * 32


def sitemap(*urls):
    return ('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
            ''.join(f"<url><loc>{url}</loc></url>" for url in urls) + '</urlset>').encode()


class IndexNowTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.key_file = Path(self.directory.name) / "indexnow-key.txt"
        self.key_file.write_text(KEY)
        self.state = Path(self.directory.name) / "state.json"

    def save_previous(self, pages):
        self.state.write_text(json.dumps({"version": 1, "site": SITE, "pages": {
            url: hashlib.sha256(body).hexdigest() for url, body in pages.items()
        }}))

    def fake_request(self, pages, submissions, status=200):
        def request(url, payload=None):
            if url == indexnow.ENDPOINT:
                submissions.append(json.loads(payload))
                return status, b""
            if url == f"{SITE}/indexnow-key.txt":
                return 200, KEY.encode()
            if url == f"{SITE}/sitemap.xml":
                return 200, sitemap(*pages)
            return 200, pages[url]
        return request

    def test_notifies_added_changed_removed_but_not_unchanged_pages(self):
        self.save_previous({SITE + '/': b'same', SITE + '/edit': b'old', SITE + '/gone': b'deleted'})
        pages = {SITE + '/': b'same', SITE + '/edit': b'new', SITE + '/added': b'added'}
        submissions = []
        with patch.object(indexnow, 'request', self.fake_request(pages, submissions, 202)):
            indexnow.notify(SITE, self.key_file, self.state)
        self.assertEqual(submissions[0]['urlList'], [SITE + '/added', SITE + '/edit', SITE + '/gone'])
        self.assertEqual(submissions[0]['host'], 'yatsu.moe')
        self.assertEqual(submissions[0]['keyLocation'], SITE + '/indexnow-key.txt')
        self.assertEqual(set(indexnow.load_state(self.state, SITE)), set(pages))

    def test_unchanged_deployment_sends_nothing(self):
        pages = {SITE + '/': b'same'}
        self.save_previous(pages)
        submissions = []
        with patch.object(indexnow, 'request', self.fake_request(pages, submissions)):
            indexnow.notify(SITE, self.key_file, self.state)
        self.assertEqual(submissions, [])

    def test_rejected_submission_preserves_previous_state(self):
        self.save_previous({SITE + '/': b'old'})
        original = self.state.read_bytes()
        with patch.object(indexnow, 'request', self.fake_request({SITE + '/': b'new'}, [], 403)):
            with self.assertRaises(RuntimeError):
                indexnow.notify(SITE, self.key_file, self.state)
        self.assertEqual(self.state.read_bytes(), original)

    def test_dry_run_does_not_submit_or_save(self):
        submissions = []
        with patch.object(indexnow, 'request', self.fake_request({SITE + '/': b'new'}, submissions)):
            indexnow.notify(SITE, self.key_file, self.state, dry_run=True)
        self.assertEqual(submissions, [])
        self.assertFalse(self.state.exists())

    def test_wrong_live_key_stops_before_submission(self):
        with patch.object(indexnow, 'request', return_value=(200, b'wrong')) as request:
            with self.assertRaises(ValueError):
                indexnow.notify(SITE, self.key_file, self.state)
        self.assertEqual(request.call_count, 1)
        self.assertFalse(self.state.exists())

    def test_sitemap_rejects_cross_host_urls_and_empty_lists(self):
        for xml in [sitemap('https://app.yatsu.moe/'), sitemap(), b'<html>error</html>']:
            with self.subTest(xml=xml), self.assertRaises(ValueError):
                indexnow.sitemap_urls(xml, SITE)

    def test_preview_origin_is_rejected_before_network_access(self):
        with patch.object(indexnow, 'request') as request:
            with self.assertRaises(ValueError):
                indexnow.notify('https://preview.vercel.app', self.key_file, self.state)
        request.assert_not_called()


if __name__ == '__main__':
    unittest.main()
