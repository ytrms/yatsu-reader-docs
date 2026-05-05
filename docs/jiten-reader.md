# Using Yatsu with Jiten Reader

[Jiten Reader](https://github.com/Sirush/JitenReader) is a browser extension that can parse Japanese text on web pages and show dictionary information while you read.

Many Yatsu users already use it by manually parsing the page. I have also submitted a request to Jiten Reader to make it recognize Yatsu automatically. Until that is available in a released version of Jiten Reader, you can add the custom setup below.

## What this does

This setup tells Jiten Reader:

- Yatsu's reading page is at `app.yatsu.moe`
- the book text lives in Yatsu's reader area
- hidden measuring text and reader markers should be ignored

You only need to do this once per browser profile.

## Before you start

Install and set up Jiten Reader first:

- [Chrome extension](https://chromewebstore.google.com/detail/jiten-reader/fkegmlkjkenojfiplaclhlmncfeooaeo)
- [Firefox extension](https://addons.mozilla.org/en-US/firefox/addon/jiten-reader/)
- [Jiten Reader GitHub page](https://github.com/Sirush/JitenReader)

Make sure Jiten Reader works on a normal page before changing the Yatsu setup. If Jiten Reader still needs an API key or first-time setup, finish that part first.

## Add the Yatsu custom meta

1. Open Jiten Reader's settings.
2. Find the setting for custom parsing metadata. It may be called **Custom meta** or something similar.
3. Paste this exact JSON:

```json
[
  {
    "host": "*://app.yatsu.moe/b*",
    "auto": true,
    "allFrames": false,
    "parserClass": "yatsu-reader-parser",
    "parseVisibleObserver": true,
    "addedObserver": {
      "observeFrom": "body",
      "notifyFor": ".book-content:not(.book-content-page-measure), .book-content:not(.book-content-page-measure) .book-content-container > *",
      "checkNested": "main, section, div",
      "config": {
        "childList": true,
        "subtree": true
      }
    },
    "filter": ".book-content-page-measure, [aria-hidden=\"true\"], [data-yatsu-current-position-marker], [data-yatsu-bookmark-marker]"
  }
]
```

4. Save the Jiten Reader settings.
5. Reload Yatsu.
6. Open a book in Yatsu.

If everything is working, Jiten Reader should start parsing the text when the reader page loads.

!!! warning

    Paste the JSON exactly as shown. Do not add comments, extra commas, or smart quotes. If the JSON is invalid, Jiten Reader may ignore the custom setup.

## If it does not parse right away

Try these in order:

1. Reload the Yatsu tab after saving the Jiten Reader setting.
2. Open the book again from the Yatsu library.
3. Use Jiten Reader's manual parse action or parse shortcut on the reader page.
4. Check that the URL starts with `https://app.yatsu.moe/b`.
5. Make sure the custom JSON is still saved in Jiten Reader's settings.

The temporary custom setup is not as good as built-in support inside Jiten Reader. If the current page or chapter does not update automatically after moving around, use Jiten Reader's manual parse action again.

## When Jiten Reader adds built-in Yatsu support

If the request is accepted and your installed version of Jiten Reader includes built-in Yatsu support, you should not need this custom JSON anymore.

At that point, you can remove the Yatsu custom meta from Jiten Reader's settings and rely on the built-in parser.

## Removing the setup

To undo this:

1. Open Jiten Reader's settings.
2. Remove the Yatsu JSON from the custom meta field.
3. Save the settings.
4. Reload Yatsu.

This only changes how Jiten Reader parses Yatsu. It does not change your Yatsu books, progress, settings, or sync data.
