# Advantages of Yatsu over Ttsu

Yatsu is a modern fork of Ttsu that keeps the parts people still rely on:
browser-based reading, Yomitan-style dictionary workflows, TTU-compatible
reading data, local-first storage, and external import/export.

The main reason to choose Yatsu is that it keeps building on that base. The
[upstream Ttsu README](https://github.com/ttu-ttu/ebook-reader#current-development-status)
currently describes the original project as maintenance-only, while Yatsu adds
newer reader controls, language support, sync options, library management, and
integrations.

If you already have a Ttsu library, you do not have to start over. Yatsu can
import Ttsu backup zips, and advanced users can still configure custom
Ttsu-compatible storage sources when they intentionally want both apps to share
the same cloud folder.

## Short version

Yatsu is usually the better choice if you want:

- more flexible bookmarks, current-position handling, and reading-point control
- richer library organization with series, tags, author grouping, bulk actions,
  and portable local backups
- account-based settings sync for Reader and Tracking preferences
- stronger reading tracker controls, goals, heatmaps, and shareable statistics
- Discord Rich Presence that's easy to set up
- active Yatsu documentation and migration guidance
- a reader that works better for Chinese and Korean in addition to Japanese

## What Yatsu keeps from Ttsu

Yatsu is not a separate reader with a completely unrelated data model. It still
comes from Ttsu and keeps the core ideas that made Ttsu useful:

- EPUB, HTMLZ, and plain text reading
- horizontal and vertical reading modes
- paginated and continuous reading
- dictionary-extension-friendly browser text
- current reading position and progress data
- reading statistics and goals
- local browser storage plus import/export
- external storage sync patterns for Drive-style libraries
- offline-capable browser/PWA use when the app and book data are cached

That compatibility matters because many readers already have libraries,
statistics, and reading positions in the older TTU/Ttsu format.

## Reader improvements

Yatsu's reader adds more ways to control where you are and how the book feels.

| Area | What Yatsu improves |
| --- | --- |
| Reader modes | Paginated and continuous reading are still available, and Yatsu adds VN mode for one-block-at-a-time reading. |
| Navigation | Yatsu supports keyboard shortcuts, tap/page controls, table-of-contents jumps, fullscreen, Zen mode, and controller navigation in supported browsers. |
| Current position | Yatsu separates the main current reading position from separate saved bookmarks, so progress and user bookmarks do not have to be the same thing. |
| Appearance | The live Appearance panel lets you tune fonts, language font profiles, writing mode, columns, furigana, themes, publisher styles, and VN reveal behavior without leaving the book. |
| Images | Books with collected images can use Yatsu's image gallery. |

These features are most useful when a book has tricky formatting, when you read
on multiple screen sizes, or when you care about returning to the same visual
spot after layout changes.

## Language support

Ttsu was created mainly for Japanese learners. Yatsu is still Japanese-first,
but it has broader CJK and Korean support:

- Simplified Chinese and Traditional Chinese reader content language choices
- language-specific font profiles for Japanese, Simplified Chinese, and
  Traditional Chinese
- Chinese font filters and Chinese preview text in the font picker
- Korean font filters and Korean preview text
- Korean character counting for progress and statistics
- automatic Korean counting when the book declares Korean or clearly contains
  Korean text

Yatsu does not replace dictionary tools, tokenizers, or grammar tools. The goal
is to make the reader display, progress, bookmarks, and statistics behave better
for more languages.

## Storage and sync improvements

Yatsu keeps local browser storage as the live app database, like Ttsu, but adds
more practical storage paths around it.

| Area | Yatsu behavior |
| --- | --- |
| Settings Sync | A free Yatsu account can sync Reader and Tracking preferences across devices. Books and reading data still stay separate from account settings sync. |
| Complete local backup | Yatsu can export a portable local backup zip with browser books, positions, bookmarks, highlights, notes, statistics, reading goals, audiobook state, subtitle data, covers, and a safe settings snapshot. |
| Compatibility path | Custom Ttsu-compatible sources remain available for users who intentionally want Yatsu and Ttsu to share a compatible cloud folder. |

## Library improvements

Yatsu's library is built for managing larger collections:

- range selection, drag selection, keyboard selection, and select-all-visible
  workflows
- bulk updates for series, tags, cover blur, progress state, export, statistics,
  and deletion
- shelves for unread, reading, completed, tags, and untagged books
- grouping by series or author, with group sorting by name, last read, last
  update, progress, or book count
- optional cover-card details for author, series, tags, and character count
- author metadata imported from new EPUB/HTMLZ files
- Supporter options for custom covers and author editing

For a small one-book-at-a-time workflow, this may not matter much. For a large
reading backlog, it makes the library easier to scan and maintain.

## Tracking and statistics improvements

Yatsu keeps the familiar local-first time and character tracking model, then
builds a richer statistics surface around it.

It can record reading time, characters read, reading speed, completion data, and
reading goal progress. Yatsu's statistics views add:

- progress light for active goals
- statistics heatmaps, streak summaries, filters, aggregation, export, deletion,
  and shareable social images

The statistics model stays local-first. Statistics and goals sync through
storage sync or backups, not through Yatsu Account Settings Sync.

## Integrations

Yatsu keeps the dictionary-extension-friendly browser reading flow and adds
Yatsu-specific integrations:

- **Yomitan/Yomichan**: Yatsu is designed to expose normal selectable text for
  browser dictionary workflows.
- **Jiten Reader**: Jiten Reader 1.1.0 and newer include native support for
  Yatsu's reading page.
- **Yatsu Whispersync**: a Yatsu-compatible build of ttu-whispersync can add
  audiobook playback, subtitle matching, reader highlighting, playback position,
  and optional Anki export.
- **Discord Rich Presence**: with the Windows companion app or Anki add-on,
  signed-in users can share current reading activity to Discord Desktop, with a
  privacy mode for generic activity.

## Migration and compatibility

Yatsu is meant to be a comfortable upgrade path, not a forced break.

For a one-time move, export a backup zip from Ttsu and import it in Yatsu. That
can bring over book data, current positions, statistics, audiobook state, and
subtitle state when those data types are present in the export.

For advanced shared-library setups, Yatsu can use custom Ttsu-compatible storage
sources. In that mode, Yatsu tries to store extra data additively so Ttsu can
ignore what it does not understand.

Related guides:

- [Migrating from Ttsu to Yatsu](migrating-from-ttsu.md)
- [Compatibility with Ttsu](ttsu-compatibility.md)
- [Google Drive Sync](google-drive-sync.md)

## When Ttsu may still be enough

Ttsu may still be fine if your current setup is stable, you only need the
original Japanese-focused reader, and you do not want new account, library,
language, or integration features.

Yatsu is the better fit when you want the familiar TTU-style reading workflow
with ongoing improvements around setup, sync, organization, language support,
tracking, and integrations.
