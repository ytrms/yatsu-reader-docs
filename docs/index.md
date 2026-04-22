# Writing Docs in Plain Markdown

This sample site is now written with Markdown only. There is no raw HTML in these pages, so you can use them as a reference when you start filling in the real Yatsu Reader documentation.

## Quick Start

1. Create a new file in `docs/`, for example `docs/library.md`.
2. Add that file to the `nav` section in `mkdocs.yml`.
3. Write normal Markdown and let MkDocs build the page.

## Heading Levels

## Second-level heading

### Third-level heading

#### Fourth-level heading

##### Fifth-level heading

###### Sixth-level heading

## Paragraphs, Emphasis, and Links

Use plain paragraphs for most content. You can add **bold text**, *italic text*, and `inline code` when you need emphasis.

- Internal link: [Getting Started](getting-started.md)
- Internal link: [Reader Guide](reader-guide.md)
- External link: [Open Yatsu Reader](https://app.yatsu.moe)

## Image

![Yatsu logo](assets/yatsu.svg)

## Quote

> Blockquotes are useful for short notes, examples, or quoted UI text.

## Horizontal Rule

---

## Footnote

You can also add a footnote when a sentence needs extra context.[^sample-footnote]

[^sample-footnote]: This is a sample footnote written in normal Markdown.
