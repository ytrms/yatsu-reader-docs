# Using the Library

The Library is where you import books, switch storage sources, browse by reading
state, series, or tags, and choose books for bulk actions.

## Opening books

In normal browsing mode, click a book card or list row to open it in the reader.
The keyboard-focused book can also be opened with `Enter`.

## Select mode

Select mode is for choosing one or more visible books before running a bulk
action. Use the check control on a book to enter select mode and select that
book.

While select mode is active:

- Click a book card or list row to select or deselect it.
- `Shift` + click selects the visible range between the last anchor book and
  the clicked book.
- Drag a selection box across visible book cards or rows to add them to the
  selection.
- Use arrow keys to move the keyboard focus.
- Press `Space` or `Enter` to select or deselect the focused book.
- Press `Shift` + an arrow key to extend the selection from the current anchor.
- Press `Ctrl` + `A` or `Cmd` + `A` to select all visible books.
- Press `Esc` or the close button in the select toolbar to leave select mode.

Selection follows the current library filter and sort order. If you switch to a
different shelf, series, or tag, books that are no longer visible are removed
from the active selection. Use **Select all visible** when you want every book
in the current filtered view.

## Bulk actions

After selecting books, the select toolbar can update series, add or remove tags,
blur or show covers, mark progress as complete or unread, export the selection,
open statistics for selected local books, delete statistics, or delete the
selected books.

Some actions depend on the current storage source. For example, renaming and
local statistics actions are only available for books stored in this browser.

## Book actions

Open a book's three-dot menu to update per-book details such as series, tags,
cover visibility, and reading progress. The details submenu shows stored
metadata such as author, character count, last read time, bookmark time, and
last update time when available.

The library display settings can show optional cover-card details. Author,
series, tags, and character count appear as compact strips when those fields are
enabled and available, with multiple tags shown as comma-separated text.

Yatsu Supporters can also choose **Change cover** from this menu and upload a
JPG or PNG image. This replaces the book's stored cover. For browser libraries,
the replacement is saved in this browser. For Drive, OneDrive, and file-system
libraries, the replacement is saved as the book's cover file in that storage
source, so other devices using the same library can display it.

Yatsu imports author metadata from new EPUB/HTMLZ imports when the book file
includes creator metadata. Supporters can also choose **Edit author** from the
book menu to choose an existing author or add, change, or clear the stored
author field for any book.
