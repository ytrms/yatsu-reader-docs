# Compatibility with Ttsu

Yatsu can import Ttsu backup ZIPs and use custom Ttsu-compatible storage sources.
For a one-time move, follow [Migrating from Ttsu to Yatsu](migrating-from-ttsu.md).

<span id="short-version"></span>

## What this means in practice

To share a cloud library between the two apps, connect both to the same custom
Ttsu-compatible source. Yatsu's built-in Google Drive connection uses its own
`yatsu-reader-data` folder and does not connect to Ttsu's default library.
See the [custom Google Drive setup](google-drive-sync.md#compatibility-with-ttsu).

Shared storage is designed to preserve Ttsu's book data format. Yatsu stores
additional data, such as highlights and extra library metadata, in separate
files alongside it. Ttsu can ignore those files.

## Things that may still look different

- Yatsu-specific features and metadata may not appear in Ttsu.
- Changes do not appear on another device or in the other app until sync completes.
- The two apps can display the same book differently because their reader settings differ.

Format compatibility does not guarantee that every feature or edit transfers in
both directions. Keep a backup before connecting an existing library, and check
a few books, saved positions, and statistics in both apps before relying on the
shared setup.

## FAQ

### Do I need two different Google Drive folders?

Yatsu's built-in connection uses a separate folder. A custom Ttsu-compatible
connection can share the folder used by Ttsu.

### Can Yatsu make my ttsu library unusable?

Yatsu is designed to keep shared book files readable by Ttsu, but a shared source
is still writable by both apps. Compatibility is not protection against deletion,
conflicting edits, or sync errors. Keep a backup that is separate from the shared
folder.

## If something seems wrong

[Report the problem](how-to-report-bugs.md) and include:

- the storage provider and whether both apps use the same folder
- whether the problem appears in one app or both
- which app last changed the affected book or reading data
- any sync error, and whether refreshing after sync changes the result
