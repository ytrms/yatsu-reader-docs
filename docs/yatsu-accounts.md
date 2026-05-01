# Yatsu Accounts and Settings Sync

Yatsu Accounts let you sign in to Yatsu so Reader and Tracking settings can follow you across devices.

For now, accounts are free. The main account feature is **Settings Sync**. A future paid plan, **Yatsu Sync**, is planned for Yatsu-managed book storage and book-related sync, but it is not available yet.

## Signing in

Open Yatsu and click **Account** in the top-right of the header.

Yatsu supports:

- Google sign-in
- Email sign-in codes

Email sign-in uses a short code sent to your email address. You do not need to create or store a password for Yatsu.

When you are signed in, the header shows your account menu. From there you can open the account page, turn on Streamer mode, or sign out.

## What Settings Sync Does

When you are signed in, Yatsu syncs Reader and Tracking settings in the background.

This includes settings such as:

- Reader appearance
- Themes and reading mode
- Text style settings
- Reader layout and navigation preferences
- Reader session settings
- Tracking preferences

Settings Sync is meant for the common case where you read on one device, then continue using Yatsu on another device and want the app to feel familiar.

## What Does Not Sync

Settings Sync does not currently sync:

- Books
- Book progress
- Bookmarks
- Highlights
- Reading statistics
- Reading goals
- Storage sources such as Google Drive, OneDrive, or local folders
- Storage credentials or cloud provider permissions
- Data settings
- Uploaded font files

Google Fonts and built-in font choices can sync as settings. Uploaded font files stay on the device where you uploaded them, so a synced custom font choice may not work on another device until that font file is also available there.

## Sync Status

In Settings, synced sections show small status labels:

- **Syncing** means Yatsu is uploading or applying settings.
- **Synced** means the latest sync completed successfully.
- **Does not sync** means that section stays local to the device.

The Settings page also shows when Reader and Tracking settings last synced. You can use the refresh button in that status box to manually check for remote changes.

Yatsu also shows the sync status note in the live reader settings panel, so you can check or refresh sync state without leaving your book.

## Per-Device Setting Overrides

Some settings are naturally device-specific. For example, you may want a larger font size on your phone than on your computer.

When you are signed in, Yatsu shows a small cloud button next to a few settings:

- Font size
- Line height
- Paragraph margins
- View mode and page columns
- Auto-scroll speed

Click or tap the cloud button to stop syncing that setting on the current device.

When sync is disabled for a setting on one device:

- Remote changes for that setting are ignored on that device.
- Local changes to that setting stay local to that device.
- Other devices can keep syncing the same setting normally.

If you turn sync back on for that setting, the device rejoins the synced value from your account.

## Sync Timing and Conflicts

Settings sync automatically while you are signed in.

Yatsu syncs after local changes, checks for remote changes while the app is active, and lets you manually refresh from the Settings page. Sync checks pause while the app is inactive.

If the same synced setting changes on two devices, Yatsu uses the most recent setting change for that individual setting. In normal use, this should feel seamless.

## Streamer Mode

Streamer mode is a local display preference for screenshots, videos, and streams.

When Streamer mode is on, Yatsu hides the email handle in the header and masks the email address on the account page with `***`.

Streamer mode only affects the current browser or device. It does not change your account email.

## Yatsu Sync

Yatsu Sync is a planned paid account feature for Yatsu-managed book storage.

The goal is to let you upload books to Yatsu and access them from your devices, with synced book progress, bookmarks, highlights, statistics, and reading data.

Yatsu Sync is not available yet, and its features may change during development.

## Privacy Basics

When you use a Yatsu Account, Yatsu stores account information needed for sign-in, such as your email address, and the synced settings associated with your account.

Yatsu does not upload your local books as part of free Settings Sync.

If you use external storage sources such as Google Drive or OneDrive, those sources keep their own data and permissions. Yatsu Accounts do not replace those storage accounts.

You can find Yatsu's Terms of Service and Privacy Policy from the account page, or at:

- [Terms of Service](https://www.yatsu.moe/terms)
- [Privacy Policy](https://www.yatsu.moe/privacy)
