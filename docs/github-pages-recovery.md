# Recovering Data from the Old GitHub Pages Version

Yatsu used to be available at:

```text
https://ytrms.github.io/yatsu-reader
```

The current Yatsu app is available at:

```text
https://app.yatsu.moe
```

If you used the old GitHub Pages version and your books were stored in **Browser** storage, the current Yatsu app cannot read that data directly. Browser data is separated by website origin, so `app.yatsu.moe` is not allowed to access data saved under `ytrms.github.io`.

To help with this, there is a small recovery tool hosted on the old GitHub Pages origin:

[Open the Yatsu Recovery Tool](https://ytrms.github.io/yatsu-reader-recovery/){ .md-button .md-button--primary }

## What the recovery tool does

The recovery tool runs in your browser and looks for the old Yatsu browser database saved under `ytrms.github.io`.

If it finds data, it can create a Yatsu backup zip that you can import into the current app.

The tool does not upload your books or reading data to a server. The export is created locally in your browser and downloaded to your device.

## Before you start

Use the same:

- device
- browser
- browser profile

that you used with the old GitHub Pages version of Yatsu.

If you used old Yatsu in Chrome on a laptop, open the recovery tool in that same Chrome profile on that same laptop. Opening the recovery tool in a different browser, a private window, or another device will usually not find the old data.

!!! warning

    Do not clear site data for `ytrms.github.io` before exporting.

    Clearing cookies, site data, IndexedDB, or browser storage for `ytrms.github.io` can delete the old local Yatsu data that the recovery tool needs.

## How to recover your data

1. Open the recovery tool:

   [https://ytrms.github.io/yatsu-reader-recovery/](https://ytrms.github.io/yatsu-reader-recovery/)

2. Wait for the tool to check the old browser database.

   If it finds data, it will show counts for books, bookmarks, and statistics rows.

3. Click **Export Yatsu backup**.

4. Save the downloaded `.zip` file somewhere you can find it.

5. Open the current Yatsu app:

   [https://app.yatsu.moe](https://app.yatsu.moe)

6. In the library, open the import menu and choose the backup import option.

7. Select the `.zip` file you downloaded from the recovery tool.

After the import finishes, your recovered books should appear in the current Yatsu library.

## What can be recovered

The recovery tool can recover data that still exists in the old browser database, including:

- books stored in Browser storage
- reading positions and progress
- reading statistics
- reading goals, if present
- audiobook and subtitle data, if present

If your old library only used Google Drive or OneDrive and did not store books in Browser storage, you may not need this tool. In that case, connect the same storage provider in the current Yatsu app and sync from there.

## If the tool does not find data

If the recovery tool says it cannot find the old database or shows `0` books, check these first:

- Are you using the same device as before?
- Are you using the same browser as before?
- Are you using the same browser profile?
- Are you in a private/incognito window? If yes, use a normal window instead.
- Did you clear site data for `ytrms.github.io`?

If the old data was cleared from the browser, the recovery tool cannot recreate it.

## If the export imports with errors

Keep the downloaded zip file and do not clear the old `ytrms.github.io` site data yet.

Then report the problem with:

- the error message shown by Yatsu
- the counts shown by the recovery tool
- which browser and device you used

The zip file may still contain recoverable data even if a normal import fails.
