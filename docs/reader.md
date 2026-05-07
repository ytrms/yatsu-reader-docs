# Using the Reader

This page is about the actual reading screen: the place you use after opening a book from the library.

The reader is meant to stay out of the way while still giving quick access to navigation, bookmarks, appearance controls, tracking, and book-specific actions.

## Main Reader Controls

The top bar contains the most common reader actions.

Depending on screen size and book type, some actions may move into the **More reader actions** menu.

Common controls include:

- **Table of contents**: opens the book's chapter list, if Yatsu can find one.
- **Save current position** or **Update current position**: saves the current reading position Yatsu uses for progress and returning later.
- **Bookmarks**: opens the saved bookmarks drawer, where you can add, name, rename, delete, and jump to bookmarks.
- **Return to current position**: jumps back to your saved current reading position, if one exists.
- **Current autoscroll speed**: shown in continuous mode when autoscroll is available.
- **Fullscreen**: toggles browser fullscreen.
- **Appearance**: opens the live appearance panel for reader-specific visual settings.
- **More reader actions**: opens less frequent reader actions such as completion, custom point controls, image gallery, and keyboard shortcuts.

On narrow screens, the reader uses a compact actions menu so the reading area keeps more space.

## Moving Through a Book

Yatsu has two reader modes: paginated and continuous. The controls are similar, but movement feels different.

In paginated mode:

- Use the page controls, tap edges, or keyboard shortcuts to move page by page.
- Use **Table of contents** to jump between chapters.
- Arrow keys can flip pages. Left and right follow the visible page edges, which means vertical text can feel different from horizontal text.

In continuous mode:

- Scroll normally.
- Autoscroll can move the text for you.
- The speed indicator shows the current autoscroll multiplier.

The default reader shortcuts include:

| Action | Shortcut |
| --- | --- |
| Previous page | `PageUp` / `ArrowUp` |
| Next page | `PageDown` / `Space` / `ArrowDown` |
| Flip toward left edge | `ArrowLeft` |
| Flip toward right edge | `ArrowRight` |
| Previous chapter | `N` |
| Next chapter | `M` |
| Toggle autoscroll | `S` |
| Increase autoscroll speed | `A` |
| Decrease autoscroll speed | `D` |
| Toggle fullscreen | `F` |
| Show keyboard shortcuts | `?` |
| Exit reader | `Esc` twice |

!!! note

    Keyboard shortcuts are ignored while many dialogs and menus are open, and while you use modifier keys such as Ctrl or Alt.

## Current Reading Position and Bookmarks

Yatsu separates the **current reading position** from user-created **bookmarks**.

The current reading position is the one place Yatsu uses for progress, returning later, and compatibility with older TTU-style progress data. Use **Save current position** or **Update current position** to store it, then use **Return to current position** to jump back.

Bookmarks are separate saved locations. Open **Bookmarks** to show the drawer, where you can:

- add a bookmark at the current location
- give a bookmark an optional name
- jump to a saved bookmark
- rename or delete a bookmark from the row actions menu

Saved bookmark markers appear in the reader. When the header is closed, clicking or tapping a bookmark marker opens a small rename/delete flyover for that bookmark.

The default shortcuts are:

| Action | Shortcut |
| --- | --- |
| Open bookmarks drawer | `B` |
| Add a quick bookmark | `Shift+B` |
| Save current reading position | `O` |
| Return to current reading position | `R` |

If text selection bookmarking is enabled in settings, Yatsu can use the selected text location when creating a current reading position or bookmark. Otherwise, it uses the current reader position.

For a screen-based position, use **Set Point** before saving. The custom reading point changes what Yatsu treats as "here", so the next saved current position or bookmark can land at the spot you chose on the screen instead of the default page or scroll reference.

Current reading position is stored with progress data. Multiple bookmarks are stored separately and can be synced or exported with your reading data when the relevant sync/export options are enabled.

## Table of Contents

The table of contents appears when the book includes chapter data that Yatsu can read.

Use it when:

- You want to jump to a specific chapter.
- You need to check where you are in the book structure.
- Keyboard chapter shortcuts are too coarse.

If a book does not include usable chapter data, the table of contents control may not appear.

## Custom Reading Point

The custom reading point tells Yatsu which part of the screen should count as your reading position.

This matters for:

- progress calculation
- current reading position
- bookmarks
- reading statistics
- returning to a stable spot after resizing or changing layout

Use **Set Point** from the reader actions menu to choose the point. If a point already exists, the menu can also show **Show Point** and **Reset Point**.

The default shortcut is:

| Action | Shortcut |
| --- | --- |
| Set custom reading point | `T` |

### Save the current reading position at a screen location

Use this when the saved current position should match the line or area you are actually reading.

1. Open the reader action menu.
2. Choose **Set Point**, or press `T`.
3. Click or tap the place on the page that should count as your current reading position.
4. Choose **Save current position** or **Update current position**, or press `O`.

After that, **Return to current position** jumps back using the position calculated from that point.

### Add a bookmark at a screen location

Use this when you want a bookmark to point to a specific line or area on the visible page.

1. Open the reader action menu.
2. Choose **Set Point**, or press `T`.
3. Click or tap the place on the page where the bookmark should be anchored.
4. Open **Bookmarks** and add a bookmark, or press `Shift+B` to add a quick bookmark.
5. Rename the bookmark if you want a label for that location.

The bookmark uses the reading position calculated from the point you just set. If **Show Point** is available, you can use it to briefly reveal the active point before saving. Use **Reset Point** if you want to go back to the default reader position.

In paginated mode, Yatsu sets the point from the text location you choose on the current page. When you turn the page, that temporary point is cleared. In continuous mode, Yatsu uses a persistent screen position. Continuous mode requires **Settings** > **Reader** > **Custom Reading Point** to be turned on.

!!! tip

    If progress or bookmarks feel slightly ahead or behind where you expect, set the custom reading point to the place your eyes naturally treat as "current".

## Appearance

The **Appearance** action opens live reader settings without leaving the book.

Use it for changes such as:

- font size and font family
- reader content language, including Simplified and Traditional Chinese glyph forms
- line height
- text margins
- vertical or horizontal writing behavior
- page columns
- furigana display
- theme and custom theme adjustments
- publisher style handling

Changes apply while the book is open, so you can adjust the reader until the text feels comfortable.

Yatsu normally uses the language stored in the book file. If Chinese text shows Japanese-style character variants, set **Reader content language** to **Simplified** or **Traditional** in the live appearance panel or in **Settings** > **Reader**.

Some layout changes can move your current position. Yatsu tries to preserve the current reading position, and the custom reading point can make that more predictable.

## Image Gallery

Some books contain images that Yatsu can collect into an image gallery.

When available, **Image gallery** appears in the reader actions menu.

Inside the gallery:

- move between images with the gallery controls
- use page or arrow shortcuts to move between images
- press `Esc` to close the gallery
- spoiler controls may appear if image spoiler settings are enabled

If the current book has no collected images, this action may not appear.

## Reading Tracking

If **Enable Statistics** is turned on, the tracker icon appears in the reader.

The tracker can record:

- reading time
- characters read
- reading speed
- book completion data
- reading goal progress

Useful defaults:

| Action | Shortcut |
| --- | --- |
| Toggle tracking | `P` |
| Freeze tracking position | `E` |

Use **Freeze tracking position** when you are about to jump around and do not want that movement counted as normal reading.

For more detail, see [Reading Tracking and Statistics](reading-tracking.md).

## Completing a Book

The reader actions menu includes **Complete book**.

Use it when you want Yatsu to record that the book is finished. Depending on your tracking settings, Yatsu may also open the tracker menu or add the remaining character count to the completion entry.

Completion data can appear in statistics and can be affected by tracking settings such as **Overwrite Book Completion** and **Update on Completion**.

## Leaving the Reader

Pressing `Esc` once shows a warning. Pressing `Esc` again within a few seconds returns to the library.

This is meant to prevent accidental exits while reading.

You can also return to the library from the app navigation.

If close confirmation is enabled and your current reading position has not been saved, Yatsu may ask for confirmation before leaving.

## When Controls Are Missing

Some reader controls only appear when they apply.

For example:

- **Table of contents** needs chapter data.
- **Return to current position** needs a saved current reading position.
- **Image gallery** needs collected images.
- **Fullscreen** depends on browser support and current context.
- **Tracking** needs statistics to be enabled.
- **Custom point** controls depend on reader mode and custom point settings.

If you do not see a control, it usually means the current book, mode, or settings do not make that function available.
