# Statistics and Sync

The Statistics page shows data stored in this browser. To see reading activity
from another device, that device must upload its statistics to a shared storage
source, and this browser must download them.

**Account Settings Sync transfers preferences only.** Use storage sync for
statistics, goals, books, and reading progress.

<span id="short-version"></span>

## Recommended setup

Connect the same Google Drive, OneDrive, or other storage source on each device.
In **Settings** > **Data** > **Sync**, choose the sync behavior for each device:

| Behavior | When to use it | Statistics behavior |
| --- | --- | --- |
| **All** | You read and review statistics on this device. | Imports when opening a book and exports updates while reading or when leaving the reader. |
| **Down** | This device should receive reading data. | Imports when opening a book. It does not automatically upload local updates. |
| **Up** | This device should send reading data. | Exports local updates. Opening a book does not import its remote statistics. |
| **Off** | You want to control transfers manually. | Statistics stay local until you run a manual sync or export/import. |

Open the relevant book and wait for sync to finish before checking its statistics.
Selecting a cloud library alone does not download all its reading history.

## Statistics libraries

Use the **Library** selector on the Statistics page to show all loaded statistics
or focus on one library. **This device** includes local browser statistics and
older entries saved before library-specific statistics were introduced.

Google Drive and OneDrive statistics keep their Ttsu-compatible, title-based
format. Existing entries are not rewritten when library filtering is introduced.

## Why it works this way

The tracker saves to the browser first so it can keep working offline. External
storage holds another copy, which is updated when sync runs. Until the copies
sync, two devices can show different totals or streaks.

## What happens when you open a Drive-backed book

With **Down** or **All**, opening a book imports its reading data from Drive into
this browser, including progress, statistics, goals, audiobook state, and subtitle
data. The Statistics page can then show the imported history.

With **Off** or **Up**, opening the book leaves the browser's existing statistics
in place without importing Drive statistics first.

## What happens while you read

The tracker saves statistics locally. With **Up** or **All**, Yatsu also exports
updates to the configured sync target. Wait for that export to finish before
expecting another device to receive them.

When both devices can change statistics, the **Statistics Merge** and **Reading
Goals Merge** settings control how incoming data combines with local data. See
[Syncing and exporting tracking data](reading-tracking.md#syncing-and-exporting-tracking-data),
including how to transfer deletions.

## Common situations

### "Settings Sync is on. Why are my stats different on phone and PC?"

Settings Sync does not transfer reading history. Follow the storage setup above
on both devices. See [Yatsu Accounts and Settings Sync](yatsu-accounts.md) for
which preferences sync through your account.

### "My Drive book has statistics, but the Statistics page is empty"

1. Check that the book uses the expected Drive account and storage source.
2. Set sync behavior to **Down** or **All**.
3. Open the book and wait for sync to finish. Check for a sync error if it fails.
4. Check the Statistics page's library, title, and date filters.

### "I read on another device, but this device does not show the new statistics"

Check that the reading device finished exporting with **Up** or **All**. On this
device, use **Down** or **All** and reopen the book to import. Both devices must
use the same storage source.

### "I selected Google Drive in the library. Does that make Statistics read directly from Drive?"

No. The Library selection controls which books you browse. Statistics appear
after their data is imported into this browser.

### "Is this different from ttsu?"

No. Ttsu also stores reading data in the browser and transfers it through
sync or import/export.
