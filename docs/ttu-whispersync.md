# Yatsu Whispersync

[Yatsu Whispersync](https://github.com/ytrms/yatsu-whispersync) is a Yatsu-compatible userscript build of [ttu-whispersync](https://github.com/Renji-XD/ttu-whispersync), a community userscript / browser extension for listening to an audiobook while reading.

Yatsu does not include Whispersync natively. This script runs through a browser userscript manager, so it can be useful, but it still depends on browser extension behavior and on Yatsu's reader page structure.

## What it does

Yatsu Whispersync adds an audiobook control panel to the reader. After you load an audio file and a subtitle file, it can:

- play audiobook audio while you read
- match subtitle lines to the book text
- highlight or jump between matched lines
- remember playback position
- optionally export sentence/audio cards to Anki

Despite the name, this is not the same thing as Yatsu account sync or Drive Sync. The "sync" part is about keeping audiobook playback, subtitle timing, and the text you are reading aligned.

## What you need

For the smoothest setup, use a desktop Chromium browser such as Chrome, Edge, or Brave.

You need:

- the Yatsu Whispersync userscript
- a userscript manager such as [Violentmonkey](https://violentmonkey.github.io/)
- the book opened in Yatsu
- an audiobook file, usually `.m4a`, `.m4b`, or `.mp3`
- a subtitle file, usually `.srt` or `.vtt`

Anki is only required if you want to export cards from Yatsu Whispersync. For listening only, you do not need Anki.

!!! warning

    Install userscripts only from people or projects you trust. A userscript runs inside the Yatsu page in your browser, so it can interact with page content and browser storage available to that page.

## Install the Yatsu-compatible script

The quickest way to get started is to install the latest Yatsu Whispersync userscript release:

[Install the Yatsu Whispersync userscript](https://github.com/ytrms/yatsu-whispersync/releases/latest/download/yatsu-whispersync.user.js)

If you already have Violentmonkey or another userscript manager installed, opening that link should show an installation prompt.

!!! note

    The docs also keep a bundled copy at [assets/yatsu-whispersync.user.js](assets/yatsu-whispersync.user.js) so older installs that check the docs asset can update to the current metadata.

The upstream ttu-whispersync project targets `reader.ttsu.app`. To use it with Yatsu, install Yatsu Whispersync or another build that targets Yatsu.

Before installing a script from any other source, check that the userscript metadata includes Yatsu, for example:

```js
// @match       https://app.yatsu.moe/*
```

If the script only mentions `https://reader.ttsu.app/*`, it is the ttu version and will not run on Yatsu by itself.

To install:

1. Install a userscript manager such as Violentmonkey.
2. Open the [Yatsu Whispersync userscript](https://github.com/ytrms/yatsu-whispersync/releases/latest/download/yatsu-whispersync.user.js).
3. Confirm the installation in the userscript manager.
4. Reload Yatsu.
5. Open a book in Yatsu.

If the script loaded successfully, you should see a new Whispersync icon or control area near the bottom of the reader.

## First setup for a book

1. Open the book in Yatsu.
2. Open the Whispersync menu from the icon near the bottom of the reader.
3. Load your subtitle file.
4. Load your audiobook file.
5. Open the **Match** tab.
6. Match the subtitle lines against the book text.
7. Choose **Save & reload page** when Whispersync asks you to.
8. After the page reloads, reopen the menu and adjust the settings you care about.

The match step is important. Until the subtitles are matched to the book, features such as reader highlighting, reader actions, and autoscroll may be limited or unavailable.

## Using Anki export

If you only want audiobook playback, skip this section.

Yatsu Whispersync can create or update Anki cards through AnkiConnect. For that to work:

1. Install [Anki](https://apps.ankiweb.net/).
2. Install [AnkiConnect](https://ankiweb.net/shared/info/2055492159).
3. Configure the deck and note type inside Whispersync.
4. Add Yatsu to AnkiConnect's `webCorsOriginList`.

For Yatsu, the origin to allow is:

```json
"https://app.yatsu.moe"
```

Then restart Anki if AnkiConnect requires it.

!!! note

    Some ttu-whispersync instructions mention `https://reader.ttsu.app`. That is correct for ttu. When using Yatsu, use `https://app.yatsu.moe` instead.

## File and browser limitations

Audio and subtitle support depends on the browser and on the file.

In general:

- subtitles should be `.srt` or `.vtt`
- audio should be `.m4a`, `.m4b`, or `.mp3`
- MP3 files should use constant bitrate if playback drifts after seeking
- desktop Chromium browsers have the best file reload behavior
- on browsers without the File System Access API, you may need to select the audio file again after refreshing

The audiobook file itself is not uploaded to Yatsu and is not synced by Yatsu. Yatsu Whispersync reads it from your device through the browser.

## Syncing playback and subtitles

Yatsu Whispersync can store playback position and persisted subtitles in the browser. In ttu-style external sync, those data types are commonly called **Audiobook** and **Subtitles**.

If you use Yatsu with a ttu-compatible external storage setup, those small data records may be imported or exported with the usual auto import/export behavior. The audio file is still local to your device.

Matched book content is separate. The upstream ttu-whispersync docs explain that matched book data is not automatically synced the same way; it may require a manual **Book Data** export if you are moving that setup between browsers.

## External storage note

Yatsu Whispersync expects the book data it works with to be available in the browser's local reader database. If a book is only being accessed through an external source and Whispersync reports missing required data for that book, import or open the book in a way that makes it available locally first.

You can still use Yatsu's normal sync features for reading progress and other supported reading data. That does not mean the audiobook file itself becomes available on another device.

## Source, license, and updates

The Yatsu-compatible source is published at [ytrms/yatsu-whispersync](https://github.com/ytrms/yatsu-whispersync).

It is adapted from [Renji-XD/ttu-whispersync](https://github.com/Renji-XD/ttu-whispersync) and preserves the upstream MIT license. The generated userscript includes the MIT license notice and links back to the Yatsu-compatible repository.

The userscript's update metadata points to the latest GitHub release:

```js
// @updateURL   https://github.com/ytrms/yatsu-whispersync/releases/latest/download/yatsu-whispersync.user.js
// @downloadURL https://github.com/ytrms/yatsu-whispersync/releases/latest/download/yatsu-whispersync.user.js
```

The userscript keeps the original `@name` and `@namespace` identity so older installs of the docs-hosted Yatsu-compatible build can update in place instead of being treated as a separate script.

## Troubleshooting

### The Whispersync icon does not appear

Check these first:

- the userscript is enabled in your userscript manager
- the script includes `https://app.yatsu.moe/*` in its metadata
- the page URL starts with `https://app.yatsu.moe/b`
- the book URL includes an `id` parameter
- you reloaded the Yatsu tab after installing the script

If you installed the regular script, it may only run on `reader.ttsu.app`.

### Matching is slow or inaccurate

Try a different matching option in the **Match** tab. If Whispersync lets you choose a starting point or target line, use that to help it find the first reliable match.

Bad OCR, abridged audiobooks, translated subtitles, missing chapters, or text differences between the ebook and subtitle file can all reduce the match rate.

### The book layout changes after matching

This can happen because Whispersync wraps matched text in helper elements so it can identify subtitle ranges. Small layout shifts are expected. Missing text, broken chapters, or unreadable pages should be treated as bugs.

### Audio drifts out of sync

If this happens with an MP3, try converting the file to a constant-bitrate MP3 or use another supported audio format. Variable-bitrate MP3 files can cause seeking and timing problems in Whispersync.

### Files do not reload automatically

Desktop Chromium browsers usually handle file reloads best. Other browsers may require selecting the subtitle or audio file again after reload.

If Whispersync asks to reopen files and then stays stuck, disable its filesystem API setting and reload the page. In the browser developer console, the recommended workaround is:

```js
window.localStorage.setItem('ttu-whispersync-reader-enable-filesystem-api', 0)
```

Then reload Yatsu.

### Anki export says "Failed to fetch"

Make sure Anki is open, AnkiConnect is installed, and `https://app.yatsu.moe` is allowed in AnkiConnect's `webCorsOriginList`.

## Removing it

To stop using Yatsu Whispersync:

1. Disable or delete the userscript in your userscript manager.
2. Reload Yatsu.

This does not delete your Yatsu books. It only removes the third-party controls from the reader page.

If you want to remove Whispersync's local settings too, clear the relevant `ttu-whispersync-*` entries from browser storage for `app.yatsu.moe`. Only do that if you are comfortable using browser developer tools, and do not clear all Yatsu site data unless you have backed up anything important.
