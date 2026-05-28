# Statistics and Sync

Yatsu's Statistics page is based on the statistics stored in this browser.

Even if your books are in Google Drive, OneDrive, or another external storage source, the app does not read the Statistics page directly from that external storage every time you open it. Instead, Yatsu uses the browser database as the live app database, then imports from or exports to external storage when sync runs.

This is inherited from ttsu, the reader Yatsu comes from. It helps keep the reader fast and usable offline, but it also means the Statistics page can look different from what is currently stored on Drive until sync has happened.

This is also separate from Yatsu Account **Settings Sync**. Settings Sync syncs Reader and Tracking preferences only. It does not import reading statistics, streaks, progress, highlights, reading goals, or books.

## Short version

- The Statistics page reads from this browser's local database.
- Settings Sync does not sync statistics or streaks.
- The **Library** selector on the Statistics page can show all statistics together or focus on one library.
- Google Drive and other external storage sources are sync sources, not the live Statistics page database.
- If sync is set to **Down** or **All**, Yatsu imports Drive statistics when you open a book.
- If sync is set to **Up** or **All**, Yatsu exports updated local statistics while you read or when you leave the reader.
- If sync is **Off**, statistics stay local unless you run a manual sync or export/import.

## Statistics libraries

The Statistics page has a **Library** selector.

- **All libraries** keeps the old default behavior and shows every loaded statistics row.
- **This device** shows local browser statistics. Older statistics rows that were created before library-scoped statistics are treated as This device data so existing users do not lose their history after upgrading.
- Google Drive and OneDrive statistics keep their existing ttsu-compatible title-based format. They are not content-fingerprinted or rewritten during the migration.

## Why it works this way

Yatsu is a browser app. The browser database is the place where the reader can quickly store and read:

- reading progress
- bookmarks
- highlights
- reading statistics
- reading goals
- recently opened books

External storage is slower and may not always be reachable. You might be offline, Drive might ask for permission again, or a network request might fail. Because of that, Yatsu keeps a local copy and then syncs selected data types between the browser database and the external storage source.

This also lets Yatsu keep working as an offline PWA.

## What happens when you open a Drive-backed book

When you open a book that is stored on Drive, Yatsu can connect to Drive for that book's data.

If your sync behavior is **Down** or **All**, Yatsu imports these data types from Drive into the browser database:

- progress
- statistics
- reading goals
- audiobook data
- subtitle data

After that import, the Statistics page can show the newly imported statistics.

If your sync behavior is **Off** or **Up**, opening the book does not import Drive statistics into this browser first. In that case, the Statistics page may still show the statistics that were already stored locally.

## What happens while you read

The reading tracker writes statistics to the browser database first.

If sync behavior is **Up** or **All**, Yatsu can then export those updated statistics to the configured sync target, such as Google Drive.

This means a newly tracked reading session usually appears locally first, then reaches Drive after the export/sync step finishes.

## Common situations

### "Settings Sync is on. Why are my stats different on phone and PC?"

Settings Sync only syncs Reader and Tracking settings through your Yatsu Account. It does not sync the statistics rows that power the Statistics page, current streak, longest streak, or reading totals.

Statistics sync through storage sync instead:

- both devices need to use the same Google Drive, OneDrive, or other storage source
- the device where you read needs to export statistics with sync behavior **Up** or **All**
- the device where you check stats needs to import statistics with sync behavior **Down** or **All**

If one device shows a 5-day streak and another shows `0`, the second browser probably has not imported those statistics yet, or both devices are not using the same storage source.

### "My Drive book has statistics, but the Statistics page is empty"

Most likely, those statistics have not been imported into this browser yet.

Check **Settings** -> **Data** -> **Sync** and make sure the sync behavior is **Down** or **All** if you want this browser to import reading data from Drive when opening a book.

Then open the relevant book and wait for the opening sync to finish.

### "I read on another device, but this device does not show the new statistics"

The other device needs to export the statistics, and this device needs to import them.

A common setup is:

- the device you read on uses **Up** or **All**
- the device you are checking from uses **Down** or **All**

If both devices use **Off**, the statistics remain separate unless you manually export/import or sync.

### "I selected Google Drive in the library. Does that make Statistics read directly from Drive?"

No. Selecting a Drive library changes which books are shown in the library, but the Statistics page still reads from the browser database.

Drive statistics become visible there after they are synced into the browser database.

### "Is this different from ttsu?"

No. This behavior matches the ttsu model: local browser data is the live app database, and external storage is used through sync/import/export.

## Recommended setup

If you use Google Drive or OneDrive and want external storage to be the shared place where your reading data moves between devices, set sync behavior to **All** on devices where you both read and review statistics.

If you only want a device to receive data from Drive, use **Down**.

If you only want a device to send local updates to Drive, use **Up**.

If you want everything to stay only on the current browser unless you act manually, use **Off**.

!!! note

    The Statistics page showing local data is not the same as Drive sync being broken. It only means the Statistics page is showing what this browser currently has stored.
