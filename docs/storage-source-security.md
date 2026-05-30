# Storage Source Security

Yatsu can save connection details for custom storage sources so the app can reconnect from this browser. This includes sources such as custom Google Drive, OneDrive, and WebDAV setups.

This page explains the warning shown when you choose **Store password in browser manager** or **Disable password encryption** in storage source settings.

## What Yatsu Stores

For a custom storage source, Yatsu may store details such as:

- the storage source type and display name
- WebDAV server URLs
- WebDAV usernames and passwords
- OAuth client IDs and client secrets for custom cloud providers
- OAuth tokens returned by the storage provider
- sync and default-source preferences

These custom source credentials are stored in this browser's local Yatsu data. Yatsu does not send them to a Yatsu account service.

## Default Protection

By default, Yatsu encrypts saved custom source credentials with a Yatsu unlock password that you choose. This password is only for unlocking the stored source details in this browser. It is not your cloud account password.

When the source needs to be unlocked, Yatsu asks for the password and decrypts the saved details locally. If you forget the password, reconnect the storage source and create a new saved setup.

## Store Password In Browser Manager

When **Store password in browser manager** is enabled, Yatsu asks the browser's password manager to remember the Yatsu unlock password.

This is more convenient because you do not need to type the unlock password every time. The tradeoff is that anyone who can access your browser profile, unlocked device, or unlocked password manager may also be able to unlock the saved storage source.

Use this only on a trusted personal device with device lock and browser account protection enabled.

## Disable Password Encryption

When **Disable password encryption** is enabled, Yatsu saves the storage source details without the extra Yatsu unlock password.

This is less secure. Someone with access to your browser profile, site data, local backups, or an unlocked device may be able to read or reuse the saved source details. Avoid this option on shared, public, managed, or untrusted devices.

If you enabled this by mistake, edit or recreate the storage source with password protection enabled. If the device or browser profile may have been exposed, revoke or rotate the affected provider credentials, OAuth client secret, app password, or WebDAV password.

## Recommendations

Prefer the default password encryption for custom storage sources. Use the browser password manager option only on trusted personal devices. Disable password encryption only when you understand and accept the local-device risk.

For WebDAV, use a dedicated app password or a limited-permission account when your provider supports it. Do not reuse your Yatsu unlock password for other services.

Clearing browser site data may remove saved local source details, so keep provider credentials and recovery information somewhere you control.

## Related Pages

- [Google Drive Sync](google-drive-sync.md)
- [WebDAV Sync](webdav-sync.md)
- [Statistics and Sync](statistics-and-sync.md)
