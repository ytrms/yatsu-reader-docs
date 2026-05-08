# Frequently Asked Questions

## Getting started

### What should I read first?

If you are new to Yatsu, start with [Using the Reader](reader.md). It explains the reader controls, page movement, bookmarks, appearance settings, tracking controls, and why some controls only appear for certain books or modes.

If you are setting up sync or moving between devices, read [Yatsu Accounts and Settings Sync](yatsu-accounts.md), then [Statistics and Sync](statistics-and-sync.md) or [Setting up Drive Sync](google-drive-sync.md), depending on what you are trying to sync.

### Do I need a Yatsu account?

No. You can use Yatsu without signing in.

A Yatsu account is mainly useful for **Settings Sync**, which can sync Reader and Tracking settings between devices. It does not replace Google Drive, OneDrive, local browser storage, or manual backups.

See [Yatsu Accounts and Settings Sync](yatsu-accounts.md) for details.

### What does Settings Sync actually sync?

Settings Sync syncs Reader and Tracking settings, such as appearance, reading mode, text style, layout preferences, navigation preferences, and tracking preferences.

It does not sync books, book progress, bookmarks, highlights, reading statistics, reading goals, storage sources, cloud credentials, data settings, or uploaded font files.

### Why did my synced font setting not work on another device?

Built-in fonts and Google Fonts can sync as settings. Uploaded font files stay on the device where you uploaded them.

If a synced custom font choice depends on an uploaded file, upload that same font file on the other device too.

## Books, storage, and sync

### Where are my books stored?

It depends on the storage source you use.

Books imported into **Browser** storage live in the current browser profile on the current device. Books from Google Drive or OneDrive live in that external storage source, with local copies or cached data kept in the browser as needed.

Browser storage is convenient, but it is still controlled by the browser and device. Keep backups or sync important books somewhere else.

### Can I rely on browser storage as my only copy?

I do not recommend it.

Browser storage works well for local and offline reading, but browser cleanup, site data deletion, profile changes, or device problems can remove it. If a book or progress record matters, export it or keep it in an external source too.

### I can't turn off persistent storage

This is normal if your browser has granted persistent storage to Yatsu.

Yatsu uses the browser's Storage API. The app can ask the browser to make its local storage persistent and can check whether that browser setting is currently active, but browsers do not provide a matching way for a website to revoke it from inside the app. If you click **Off** after the browser has granted persistent storage, Yatsu checks the browser state and shows **On** again.

Persistent storage means the browser should avoid deleting Yatsu's local data automatically when it needs to free space. It does not upload your data anywhere.

To turn it off, use your browser's site settings for Yatsu and remove or revoke storage for `app.yatsu.moe`. You can also clear site data for Yatsu, but read the warning below first.

!!! warning

    Clearing site data can remove local books, settings, progress, and cached data stored in the browser. Export anything you want to keep first, especially if you use Browser storage as your main library.

Browser labels differ, but look for one of these areas:

- Site settings or permissions
- Privacy and security
- Cookies and site data
- Storage used by this site

After revoking or clearing storage, reload Yatsu. The **Persistent storage** setting should no longer show as enabled.

### Can I use Yatsu offline?

Yes, but only for data that is already on the device.

Open Yatsu while online, open the books you want available offline, and turn on **Full Offline Use** if you want the app shell saved for offline PWA use. Google Drive and OneDrive still need an internet connection for fetching, listing, importing, exporting, and syncing.

See [Using Yatsu Offline](offline.md) for the full checklist.

### Do I have to install Yatsu as a PWA for offline use?

No. Offline support comes from the browser saving Yatsu's app files and local data. A normal browser tab can work offline after the app has loaded and cached the needed files.

The installed PWA can be nicer on mobile, but it still needs to be opened and prepared while online first.

### Why does Yatsu show the browser's offline page?

That means the browser did not have enough of Yatsu saved to start the app while offline.

Go online, open Yatsu, turn on **Full Offline Use** in **Settings** -> **Data** if you want full offline PWA behavior, wait until saving finishes, then try offline again.

### Do I need the Google Drive setup?

Only if you want to sync Yatsu with Google Drive.

Yatsu's current Google Drive setup is the bring-your-own Google Cloud project flow described in [Setting up Drive Sync](google-drive-sync.md). Yatsu Accounts and Settings Sync do not set up Google Drive book sync for you.

### Can I use the same Google Drive folder with Yatsu and ttsu?

Yes. Yatsu is designed to stay compatible with ttsu's shared storage layout.

Yatsu may store extra data for Yatsu-specific features, but it should do so in files that ttsu can ignore. See [Compatibility with Ttsu](upstream-compatibility.md) for details and caveats.

## Statistics and tracking

### Why is the Statistics page empty even though my Drive book has stats?

The Statistics page reads from this browser's local database. Google Drive and other external storage sources are sync sources, not the live Statistics page database.

If you want this browser to import Drive statistics, set the source sync behavior to **Down** or **All**, open the relevant book, and wait for the opening sync to finish.

See [Statistics and Sync](statistics-and-sync.md) for the detailed model.

### I read on another device. Why does this device not show the new statistics?

The device where you read needs to export the statistics, and this device needs to import them.

For external storage sources, a common setup is **Up** or **All** on the reading device and **Down** or **All** on the device where you review statistics.

### Does Settings Sync sync reading statistics or goals?

No. Yatsu Account Settings Sync does not sync reading statistics, reading goals, bookmarks, highlights, book progress, or books.

Statistics and goals are local first. They can move through manual export, manual sync, automatic storage sync, or provider-specific sync features.

### The tracker is visible, but nothing is counting

Check that the tracker is running, not paused. A red play icon means tracking is paused; a pause icon means it is running.

Also check whether auto-pause, idle pause, **Freeze Position**, or a skip threshold is active. Reading time can increase without characters if you are not moving through the book.

More troubleshooting is in [Reading Tracking](reading-tracking.md).

### Why did a big jump not count as characters read?

That is usually the skip threshold. By default, Yatsu treats a large forward or backward jump as navigation rather than normal reading.

You can change the forward and backward skip thresholds in **Settings** -> **Tracking**, or set them to `0` if you do not want that protection.

### Completing a book did not add the remaining characters. Is that expected?

Yes, if **Update on Completion** is off.

Turn on **Update on Completion** if you want completing a book to add the missing character count between your current position and the end. Leave it off if completion should only mark the book as finished.

## Reader behavior

### Why are some reader buttons missing?

Some reader controls only appear when they apply.

For example, **Table of contents** needs chapter data, **Return to current position** needs a saved current position, **Image gallery** needs collected images, and tracking controls need **Enable Statistics** to be on.

See [Using the Reader](reader.md#when-controls-are-missing).

### What is the difference between current reading position and bookmarks?

The current reading position is the main saved position Yatsu uses for progress and returning later. Bookmarks are separate saved locations that you can name, rename, delete, and jump to.

Use **Save current position** or **Update current position** for progress. Use **Bookmarks** for extra places you want to remember.

### Why does my saved position or bookmark feel slightly off?

The reader has to choose a text position from the current page or scroll location. If that default point does not match where your eyes treat "current" as being, use **Set Point** before saving the current position or adding a bookmark.

The custom reading point is explained in [Using the Reader](reader.md#custom-reading-point).

## Language support

### Why do Chinese characters look like Japanese variants?

Yatsu normally uses the language stored in the book file. If a Chinese book is missing language metadata or declares the wrong language, the browser may shape some characters with Japanese glyph forms.

Open the reader's **Appearance** panel and set **Reader content language** to **Simplified** or **Traditional** for that book. See [Chinese Support](chinese-support.md).

### How should I count Korean books?

For Korean books, open the reader's **Appearance** panel and set **Character Counting Method** to **Auto** or **Korean**.

**Auto** only switches to Korean counting when the book declares Korean or the text looks clearly Korean. If the book metadata is unclear, use **Korean** directly. See [Korean Support](korean-support.md).

## Integrations

### How do I use Yatsu with a popup dictionary?

Yatsu works with browser-based popup dictionary extensions such as [Yomitan](https://yomitan.wiki/) and Jiten Reader.

If you use Jiten Reader, update it to version 1.1.0 or newer, reload Yatsu, and open a book at a `https://app.yatsu.moe/b` URL. Newer Jiten Reader versions include native Yatsu support.

See [Using Yatsu with Jiten Reader](jiten-reader.md) for setup and fallback steps.

### What is ttu-whispersync for?

`ttu-whispersync` is a userscript workflow for syncing playback and subtitles with the reader, with optional Anki export support.

Use [Using Yatsu with ttu-whispersync](ttu-whispersync.md) if you are trying to align audio or video subtitles with a Yatsu book. You do not need it for normal reading, normal statistics, or Yatsu Account Settings Sync.

## Support

### How do I report a bug?

Use [How to Report Bugs](how-to-report-bugs.md). It explains how to download a diagnostics bundle, what to include in the report, what the diagnostics ZIP contains, and the privacy notes around that data.

If the bug involves sync or storage, include which source you use, which device changed data, which device failed to see it, and whether refreshing or reopening the book changed anything.
