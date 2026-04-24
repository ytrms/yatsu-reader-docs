# Frequently Asked Questions

## I can't turn off persistent storage

This is normal if your browser has granted persistent storage to Yatsu.

Yatsu uses the browser's Storage API. The app can ask the browser to make its local storage persistent and can check whether that browser setting is currently active, but browsers do not provide a matching way for a website to revoke it from inside the app. If you click **Off** after the browser has granted persistent storage, Yatsu checks the browser state and shows **On** again.

Persistent storage means the browser should avoid deleting Yatsu's local data automatically when it needs to free space. It does not upload your data anywhere.

To turn it off, use your browser's site settings for Yatsu and remove or revoke storage for `app.yatsu.moe`. You can also clear site data for Yatsu, but read the warning below first.

!!! warning

    Clearing site data can remove local books, settings, progress, and cached data stored in the browser. Export anything you want to keep first, especially if you use Browser storage as your main library.

Browser labels differ, but look for one of these areas:

- Site settings or permissions
- Privacy and security
- Cookies and site data
- Storage used by this site

After revoking or clearing storage, reload Yatsu. The **Persistent storage** setting should no longer show as enabled.
