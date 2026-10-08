# Yatsu Accounts and Settings Sync

A free Yatsu account lets you sync Reader and Tracking preferences between devices.
You can read without an account. Books and reading history use separate
[storage sync](statistics-and-sync.md) or backups.

## Signing in

Open Yatsu and click **Account** in the top-right of the header.

Yatsu supports:

- Google sign-in
- Discord sign-in
- Email sign-in codes

Email sign-in uses a short code sent to your email address. You do not need to create or store a password for Yatsu.

When you are signed in, the header shows your account menu. From there you can turn Settings Sync on or off, open the account page, turn on Streamer mode, or sign out.

## Usernames

Signed-in users can optionally create a username from the account page.

When set, your username appears in the header account button instead of your email handle. The account page still shows your email address so you can confirm which sign-in identity you are using.

Usernames are unique and use lowercase letters, numbers, or underscores. Basic usernames can be 4-12 characters long. Supporter usernames can be 2-24 characters long.

After setting or changing a username, you can change it again after 28 days. If you upgrade from Basic to Supporter after changing your username, Yatsu lets you change it once right away so you can use the wider Supporter range.

## What Settings Sync Does

When Settings Sync is on, Yatsu syncs Reader and Tracking settings in the background.

New accounts and fresh devices start with Settings Sync off. To turn it on, open the account menu in the header and switch **Settings sync** to **On**.

If you already used Settings Sync on a device before this control was added, that device keeps Settings Sync on.

Synced settings include:

- Reader appearance
- Themes and reading mode
- Text style settings
- Reader layout and navigation preferences
- Reader session settings
- Tracking preferences

## What Does Not Sync

| Not included | How to use it on another device |
| --- | --- |
| Books, progress, bookmarks, highlights, notes, statistics, and goals | Use [storage sync](statistics-and-sync.md) or a backup. |
| Storage sources, credentials, cloud permissions, and Data settings | Configure them on each device. |
| Uploaded font files | Upload the same font files on each device. |

Built-in font choices, Google Fonts choices, and language font profiles sync as
settings. Supporter themes can also sync saved font names and sizes. A synced
font choice only works if that font is available on the receiving device.

## Sync Status

When Settings Sync is on, synced sections show small status labels:

- **Syncing** means Yatsu is uploading or applying settings.
- **Synced** means the latest sync completed successfully.
- **Does not sync** means that section stays local to the device.

Check sync status in Settings or the reader's Appearance panel. Settings also
shows the last sync time and a refresh button to check for remote changes.

When Settings Sync is off, Reader and Tracking settings show a short note at the bottom instead of sync status labels or per-setting cloud buttons.

## Per-Device Setting Overrides

To keep a setting different on one device—for example, a larger font on your
phone—use its cloud button. These buttons appear when Settings Sync is on for:

- Font size
- Line height
- Paragraph margins
- View mode and page columns
- VN reveal speed and Supporter screen content
- Auto-scroll speed

Click or tap the cloud button to stop syncing that setting on the current device.

When sync is disabled for a setting on one device:

- Remote changes for that setting are ignored on that device.
- Local changes to that setting stay local to that device.
- Other devices can keep syncing the same setting normally.

If you turn sync back on for that setting, the device rejoins the synced value from your account.

## Sync Timing and Conflicts

Yatsu syncs after local changes, checks for remote changes while the app is active, and lets you manually refresh from the Settings page. Sync checks pause while the app is inactive.

If the same setting changes on two devices, Yatsu uses the most recent change
for that setting.

## Streamer Mode

Streamer mode is a local display preference for screenshots, videos, and streams.

When Streamer mode is on, Yatsu hides the email handle in the header and masks the email address on the account page with `***`.

If you have a username, Streamer mode hides that account name in the header and masks it on the account page too.

Streamer mode only affects the current browser or device. It does not change your account email or username.

## Privacy Basics

When you use a Yatsu Account, Yatsu stores account information needed for sign-in, such as your email address, and the synced settings associated with your account.

Settings Sync does not upload your books.

If you use external storage sources such as Google Drive or OneDrive, those sources keep their own data and permissions. Yatsu Accounts do not replace those storage accounts.

You can find Yatsu's Terms of Service and Privacy Policy from the account page, or at:

- [Terms of Service](https://www.yatsu.moe/terms)
- [Privacy Policy](https://www.yatsu.moe/privacy)
