# Korean Support

Yatsu is still Japanese-first, but it has support for reading Korean ebooks more comfortably.

The main Korean-specific features are:

- Korean fonts in the reader font picker
- a Korean font filter and Korean preview text
- Korean character counting for progress and reading statistics
- automatic detection for books that declare Korean or clearly contain Korean text

## Korean Fonts

Open a book, then open **Appearance** from the reader toolbar.

In **Font family**, use the language filter and choose **Korean** to narrow the list to Korean-capable fonts. Yatsu includes these Google Fonts options:

- Noto Sans KR
- Noto Serif KR
- Nanum Gothic
- Nanum Myeongjo
- Gowun Dodum
- Gowun Batang

You can also use uploaded fonts or installed system fonts. If the font name or file name looks Korean, Yatsu can include it in the Korean font filter.

!!! note

    Google Fonts are fetched by the browser from Google. Uploaded fonts stay in your browser storage unless you export or sync browser data yourself.

## Character Counting

Yatsu's progress counters and reading tracker are based on character positions. For Japanese and Chinese, Yatsu counts Japanese kana, CJK ideographs, full-width alphanumerics, and related characters. For Korean, Yatsu can count Hangul instead.

Open **Appearance** while reading and set **Character Counting Method**:

| Method | What it does |
| --- | --- |
| **Auto** | Uses Korean counting when the book declares Korean or the text looks clearly Korean. Otherwise uses Japanese/Chinese counting. |
| **Japanese/Chinese** | Uses Yatsu's normal Japanese and Chinese counting. |
| **Korean** | Counts Hangul and alphanumerics for the current book. |

Use **Korean** when a Korean book has missing or incorrect language metadata, or when **Auto** does not recognize the book.

## What Changes When You Switch Counting Method

Changing the counting method affects the current book's character counters, progress positions, chapter character totals, bookmarks, and reading tracker calculations that depend on character position.

Existing statistics entries are not rewritten. If you have already tracked reading for a book with the wrong method, future tracker updates will use the new method, but older saved rows keep the numbers that were recorded at the time.

The character counting method is stored locally per book. Yatsu Account Settings Sync does not sync it between devices.

## Recommended Setup for Korean Books

1. Open the Korean book.
2. Open **Appearance**.
3. Pick a Korean font, such as **Noto Sans KR** or **Noto Serif KR**.
4. Set **Character Counting Method** to **Auto**.
5. If the character counter stays at zero or looks too low, set it to **Korean**.

If you use the tracker, update or restart the tracker after changing the counting method so the current session starts from the corrected character position.

## Limitations

Yatsu does not currently add a separate Korean reader content language override. The **Reader content language** setting is mainly for choosing Japanese, Simplified Chinese, or Traditional Chinese glyph forms for shared CJK characters.

Dictionary, tokenizer, and morphology features are still outside Yatsu's built-in Korean support. For Korean books, Yatsu focuses on display, progress, and statistics.
