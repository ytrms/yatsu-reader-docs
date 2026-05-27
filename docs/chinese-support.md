# Chinese Support

Yatsu is still Japanese-first, but it supports Chinese ebooks and Chinese text inside mixed-language books.

The main Chinese-specific features are:

- reader content language selection for Japanese, Simplified Chinese, and Traditional Chinese glyph forms
- language-specific reader font profiles for Japanese, Simplified Chinese, and Traditional Chinese
- Simplified Chinese and Traditional Chinese font filters
- Chinese preview text in the font picker
- Chinese-capable Google Fonts
- character counting through Yatsu's normal Japanese/Chinese counting method

## Reader Content Language

Some Han characters are shared across Japanese and Chinese, but the preferred glyph shape can differ by language. If a Chinese book shows Japanese-style character forms, set the reader content language manually.

Open a book, then open **Appearance** from the reader toolbar. In **Reader content language**, choose:

| Setting | What it does |
| --- | --- |
| **Auto** | Uses the language stored in the book file. If the book does not declare a language, Yatsu falls back to Japanese. |
| **Japanese** | Renders shared CJK characters with Japanese glyph forms. |
| **Simplified Chinese** | Renders shared CJK characters with Simplified Chinese glyph forms. |
| **Traditional Chinese** | Renders shared CJK characters with Traditional Chinese glyph forms. |

Reader content language is stored locally for the current book. It is available only from the live **Appearance** panel while a book is open, and it is not synced by Yatsu Account Settings Sync.

## Chinese Fonts

Open **Appearance**, then use **Font profile** to choose which language profile you are editing. The **Default** profile is the fallback. The **Japanese**, **Simplified Chinese**, and **Traditional Chinese** profiles apply automatically when the book's effective reader content language matches that profile.

Each profile has its own Group 1 and Group 2 font family and weight settings. Use **Reset** on a language profile to inherit the Default fonts again.

Use the language filter in the font picker to narrow the font list:

- **Simplified Chinese** for Simplified Chinese fonts
- **Traditional Chinese** for Traditional Chinese fonts

Yatsu includes these Simplified Chinese Google Fonts options:

- Noto Sans SC
- Noto Serif SC
- ZCOOL XiaoWei
- ZCOOL QingKe HuangYou

Yatsu includes these Traditional Chinese Google Fonts options:

- Noto Sans TC
- Noto Serif TC
- Noto Sans HK
- LXGW WenKai TC
- Chiron Sung HK

You can also use uploaded fonts or installed system fonts. If the font name or file name looks Chinese, Yatsu can include it in the relevant Chinese font filter.

!!! note

    Google Fonts are fetched by the browser from Google. Built-in and Google Fonts choices can sync through Yatsu Account Settings Sync, including language font profiles. Uploaded fonts stay in your browser storage unless you export or sync browser data yourself.

## Character Counting

Chinese books use Yatsu's normal Japanese/Chinese counting method. This counts CJK ideographs, Japanese kana, full-width alphanumerics, and related characters for progress, bookmarks, chapter totals, and reading statistics.

For Chinese books, leave **Character Counting Method** set to **Auto** or **Japanese/Chinese**. The **Korean** method is only for Korean books and will undercount Chinese text.

## Recommended Setup for Chinese Books

1. Open the Chinese book.
2. Open **Appearance**.
3. Set **Reader content language** to **Simplified Chinese** or **Traditional Chinese** if the glyph shapes look wrong.
4. In **Font profile**, choose the matching Chinese profile and pick fonts such as **Noto Sans SC**, **Noto Serif SC**, **Noto Sans TC**, or **Noto Serif TC**.
5. Leave **Character Counting Method** on **Auto** or **Japanese/Chinese**.

## Limitations

Yatsu does not currently distinguish every regional Chinese glyph preference beyond the Simplified, Traditional, and Hong Kong/Taiwan-oriented fonts available in the font picker.

Dictionary, tokenizer, and segmentation features are outside Yatsu's built-in Chinese support. For Chinese books, Yatsu focuses on display, progress, bookmarks, and statistics.
