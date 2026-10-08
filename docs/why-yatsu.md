<span id="advantages-of-yatsu-over-ttsu"></span>

# What Yatsu adds to Ttsu

Yatsu is based on Ttsu. It keeps EPUB, HTMLZ, and plain text reading, horizontal
and vertical layouts, and support for browser dictionary extensions.

The differences below focus on Yatsu's reader controls, library tools, language
support, and sync. For a one-time move, you can [import a Ttsu backup ZIP](migrating-from-ttsu.md)
with your books, saved reading positions, and statistics.

## Short version

- Save multiple named bookmarks without changing your main reading position.
- Read one block at a time in VN mode.
- Group books by author and select multiple books for bulk edits.
- Sync Reader and Tracking settings through a free Yatsu account.
- Choose Chinese font profiles and use Hangul character counting for Korean books.
- Share statistics images or show your reading activity in Discord.

## Reader improvements

**Named bookmarks** let you save passages to return to while keeping a separate
current reading position for progress. See [Current reading position and bookmarks](reader.md#current-reading-position-and-bookmarks).

**VN mode** shows one block at a time, such as a paragraph or image. You can
adjust the text reveal speed; Supporters can also group sentences into screens.
See [Moving through a book](reader.md#moving-through-a-book).

The **Appearance** panel lets you change reader settings while the book is open.
Yatsu also adds **Zen mode**, which hides reader controls and overlays, and
configurable controller navigation in supported browsers. See [Using the Reader](reader.md).

## Library improvements

Yatsu adds author grouping, plus range and drag selection for bulk actions.
You can show author, series, tags, and character counts on book cards.
Supporters can upload replacement covers and edit author metadata.

A **complete local backup** exports the Browser library, reading data, and
supported settings in one ZIP. Account sign-in, cloud authorization, and uploaded
fonts are excluded. See [Using the Library](library.md).

## Language support

For Chinese books, Yatsu provides Simplified and Traditional Chinese glyph
settings, separate font profiles, and Chinese font filters and previews.

For Korean books, Yatsu adds Korean fonts and Hangul character counting for
progress and statistics. Automatic counting uses the book's language metadata
or detected text; you can select Korean counting manually if detection fails.

See [Chinese Support](chinese-support.md) and [Korean Support](korean-support.md).
Dictionary lookup still uses an external tool.

## Storage and sync improvements

A free Yatsu account can sync Reader and Tracking preferences between devices.
You can keep selected settings, such as font size, different on each device.

**Settings Sync does not transfer books or reading history.** Those use storage
sync or backups. See [Yatsu Accounts and Settings Sync](yatsu-accounts.md) and
[Statistics and Sync](statistics-and-sync.md).

## Tracking and statistics improvements

Yatsu adds a goal progress light in the reader and PNG export for sharing
statistics. Supporters can customize statistics images with layouts,
backgrounds, and additional rows. See [Reading Tracking and Statistics](reading-tracking.md).

## Integrations

- [Jiten Reader](jiten-reader.md) can parse text on Yatsu's reading page.
- [Yatsu Whispersync](ttu-whispersync.md) adapts ttu-whispersync for audiobook
  playback, subtitle matching, and optional Anki export. It requires a userscript manager.
- [Discord Rich Presence](discord-rich-presence.md) shows reading activity in
  Discord Desktop. It requires a Yatsu account and either the Windows companion
  or the Anki add-on. Display customization is a Supporter feature.

## What Yatsu keeps from Ttsu

Ttsu already provides paginated and continuous reading, vertical text, dictionary
extension support, reading statistics and goals, custom reading points, an image
gallery, import/export, external storage, and offline use. These remain available
in Yatsu; they are not Yatsu additions.

## Migration and compatibility

Use a [backup ZIP](migrating-from-ttsu.md) to move your Ttsu library into Yatsu.
The import includes the data types you selected when exporting.

To use both apps with one cloud library, configure a custom Ttsu-compatible
storage source. Yatsu's built-in Google Drive connection uses a separate
`yatsu-reader-data` folder. Read [Compatibility with Ttsu](ttsu-compatibility.md)
before connecting a shared library.

## When Ttsu may still be enough

If Ttsu already covers your reading needs, you can keep using it. Consider Yatsu
if you want the features above; you can keep your Ttsu backup while trying it.
