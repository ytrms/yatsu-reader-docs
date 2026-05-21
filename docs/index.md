# Yatsu Reader Docs

Yatsu Reader is a web-based ebook reader built for Japanese learners, with support for reader customization, language-specific text handling, reading statistics, offline use, account settings sync, and optional integrations with tools such as Jiten Reader, Google Drive, and ttu-whispersync.

These docs focus on the parts of Yatsu that usually need extra explanation: how reading behavior works, what sync does and does not cover, how to set up external storage, how statistics are recorded, and how Yatsu stays compatible with related TTU/Ttsu workflows.

## Start here

- [Using the Reader](reader.md): Reader controls, page movement, bookmarks, table of contents, appearance settings, image gallery, reading tracking, and completion behavior.
- [Using the Library](library.md): Opening books, select mode, range selection, drag selection, and bulk library actions.
- [Yatsu Accounts and Settings Sync](yatsu-accounts.md): Signing in, usernames, what Settings Sync includes, what stays local, sync status, per-device overrides, and privacy basics.
- [Using Yatsu Offline](offline.md): What works offline, how to prepare books, persistent storage, full offline use, cache data, and syncing again after being offline.
- [Frequently Asked Questions](faq.md): Short answers for common confusing cases.
- [How to Report Bugs](how-to-report-bugs.md): How to download diagnostics, what to include in a report, and what private data is or is not included.

## Reading and language support

- [Reading Tracking](reading-tracking.md): What Yatsu records, how time and characters are counted, reading goals, statistics controls, privacy, sync, and export behavior.
- [Chinese Support](chinese-support.md): Content language settings, Chinese fonts, character counting, recommended setup, and current limitations.
- [Korean Support](korean-support.md): Korean fonts, character counting methods, setup recommendations, and current limitations.

## Sync, storage, and data

- [WebDAV Storage](webdav-sync.md): Use a NAS, self-hosted server, or other WebDAV endpoint as a Yatsu library and sync source.
- [Google Drive Sync](google-drive-sync.md): The one-click Google Drive setup, what Yatsu stores in Drive, and the legacy custom Google Cloud setup.
- [Statistics and Sync](statistics-and-sync.md): How reading statistics behave across local books, Drive-backed books, synced libraries, and multiple devices.
- [Migrating from Ttsu to Yatsu](migrating-from-ttsu.md): How to export a backup zip from ttsu and import it into Yatsu.
- [Recovering Old GitHub Pages Data](github-pages-recovery.md): How to export and import data from the old GitHub Pages version of Yatsu.
- [Compatibility with Ttsu](ttsu-compatibility.md): How Yatsu treats TTU/Ttsu data compatibility, what should transfer cleanly, and where behavior may still differ.

## Integrations

- [Using Yatsu with Jiten Reader](jiten-reader.md): How to connect Jiten Reader to Yatsu and what to try if parsing does not start right away.
- [Using Yatsu with ttu-whispersync](ttu-whispersync.md): How the Yatsu-compatible userscript syncs playback and subtitles, exports Anki cards, and works with external storage.
