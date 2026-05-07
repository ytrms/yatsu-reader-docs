# Using Yatsu with Jiten Reader

[Jiten Reader](https://github.com/Sirush/JitenReader) is a browser extension that can parse Japanese text on web pages and show dictionary information while you read.

Jiten Reader 1.1.0 and newer include native support for Yatsu Reader. After Jiten Reader is installed and set up, it should automatically recognize Yatsu's reading page and parse the current book text.

## Before you start

Install and set up Jiten Reader first:

- [Chrome extension](https://chromewebstore.google.com/detail/jiten-reader/fkegmlkjkenojfiplaclhlmncfeooaeo)
- [Firefox extension](https://addons.mozilla.org/en-US/firefox/addon/jiten-reader/)
- [Jiten Reader GitHub page](https://github.com/Sirush/JitenReader)

Make sure Jiten Reader works on a normal page before testing it with Yatsu. If Jiten Reader still needs an API key or first-time setup, finish that part first.

## Use Jiten Reader with Yatsu

1. Update Jiten Reader to version 1.1.0 or newer.
2. Reload any open Yatsu tabs after updating the extension.
3. Open a book in Yatsu.
4. Confirm that the URL starts with `https://app.yatsu.moe/b`.

If everything is working, Jiten Reader should start parsing the text when the reader page loads.

## If it does not parse right away

Try these in order:

1. Reload the Yatsu tab after updating Jiten Reader.
2. Open the book again from the Yatsu library.
3. Use Jiten Reader's manual parse action or parse shortcut on the reader page.
4. Check that the URL starts with `https://app.yatsu.moe/b`.
5. Confirm that Jiten Reader is on version 1.1.0 or newer.
6. If you previously added Yatsu custom meta, remove it and reload Yatsu so the built-in parser can take over.

This only changes how Jiten Reader parses Yatsu. It does not change your Yatsu books, progress, settings, or sync data.

??? fallback "Fallback for older Jiten Reader versions"

    If you are using a Jiten Reader version older than 1.1.0, you can add custom parsing metadata manually.

    This fallback tells Jiten Reader:

    - Yatsu's reading page is at `app.yatsu.moe`
    - the book text lives in Yatsu's reader area
    - hidden measuring text and reader markers should be ignored

    You only need to do this once per browser profile.

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

    !!! warning

        Paste the JSON exactly as shown. Do not add comments, extra commas, or smart quotes. If the JSON is invalid, Jiten Reader may ignore the custom setup.

    When you update to Jiten Reader 1.1.0 or newer, remove this custom Yatsu meta from Jiten Reader's settings and rely on the built-in parser.
