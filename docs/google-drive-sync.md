# Google Drive Sync

Yatsu can use Google Drive as a remote library and sync target. For most people, the built-in Google Drive source is now the recommended setup: no Google Cloud project, no OAuth client ID, and no client secret.

Yatsu Accounts and Settings Sync are separate from Google Drive. A Yatsu account can sync some app settings, while Google Drive stores books and book-related data in your own Drive.

## Recommended: one-click Google Drive

You only need a Google account.

1. Open Yatsu and go to the Library.
2. Click the storage picker in the header.
3. Choose **Google Drive**.
4. Pick your Google account in the Google account picker.
5. Review the Google permission screen and continue.
6. Wait for Yatsu to load the Drive library.

The first time you connect, Yatsu creates its own `yatsu-reader-data` folder in your Drive. After that, Yatsu stores the authorization in this browser's local Yatsu data, so reloading the page should not ask you to log in again.

It is still normal for Google Drive to ask you to sign in again every once in a while. The built-in Drive source stores a short-lived Google access token in this browser, not a permanent Google password or a long-lived server-side Drive session. You may need to authorize Drive again after the token expires, after clearing Yatsu site data, after revoking Yatsu's access from your Google account, after using a different browser profile or device, or after Google asks Yatsu to refresh the authorization.

## Managing the built-in Google Drive source

You can manage the built-in Google Drive connection from **Settings** -> **Data** -> **Sync & Sources**.

- **Reconnect** refreshes the default Google Drive authorization for the current browser.
- **Switch account** opens Google's account picker so you can choose a different Google account.
- **Disconnect** makes Yatsu forget the default Google Drive authorization stored in this browser. It does not delete your books or the `yatsu-reader-data` folder from Google Drive.

If you disconnect or switch accounts while using Google Drive as the active library or sync target, you may need to choose the storage source again from the Library header or update your sync settings.

## What Yatsu can access

The built-in Google Drive source uses Google's `drive.file` permission. This is a limited Drive permission for app-created or app-authorized files, not broad access to your whole Drive.

Because of that limited permission, the built-in source will not automatically pick up an old `ttu-reader-data` folder that was created by ttsu. It uses Yatsu's own `yatsu-reader-data` folder instead.

## Compatibility with ttsu

The one-click Google Drive source is a Yatsu default source and is not meant to interoperate with ttsu.

If you want to keep an intentionally configured ttsu-compatible storage source, use a custom Google Drive source instead. The old bring-your-own Google Cloud setup is still available below for that advanced case.

??? note "Legacy custom Google Drive setup"

    Use this only if you need a custom Google Drive storage source, your own OAuth client, or an advanced ttsu-compatible setup. Most users should use the one-click Google Drive source above.

    ## Prerequisites

    A Google account.

    ## Steps

    Go to [this page](https://console.cloud.google.com/projectselector2/home/dashboard) and click on "Create Project".

    In the "Project name" field, give it any name you want, then click on Create. You don't need to pick an organization in the "Parent resource" field.

    ![](assets/proj-name.png)

    You will be automatically redirected to the project page:

    ![](assets/proj-page.png)

    Click on the three lines at the top left to open the sidebar. Hover over "APIs & Services" and then click on "Enabled APIs & services":

    ![](assets/side-menu.png)

    Click on "+ Enable APIs and services":

    ![](assets/enable-apis.png)

    In the search box, write "Google Drive" and press on Enter.

    Then, click on "Google Drive API":

    ![](assets/drive-api.png)

    Click on the blue Enable button that appears.

    You will be redirected to the Google Drive API details. From that screen, click on "OAuth consent screen":

    ![](assets/oauth.png)

    Click on the blue "Get started" button in the middle. This screen will appear:

    ![](assets/proj-configuration.png)

    In "App name", you can write whatever you want.

    In "User support email", pick your own email from the list.

    Click on "Next".

    From "Audience", click on "External", then click on "Next".

    In "Contact Information", enter your own email, then click on Next.

    In "Finish", click on the checkbox to agree to the terms, then click on "Continue".

    Click on "Create".

    You will be redirected to this page:

    ![](assets/data-access.png)

    Click on "Data Access" on the left.

    From the new page that appears, click on the white "Add or remove scopes" button. A table will appear from the right side.

    Click on the text area next to "Filter" and write "drive.file". Then click on the only option that appears. This will filter the table to only show the "Drive file" scope.

    Click on the checkbox next to the only row that appears, then click on "Update" at the bottom:

    ![](assets/drive-checkbox.png)

    The table will close, and you will see the page you were on before. Click on the "Save" button at the bottom to save:

    ![](assets/save-scope.png)

    From the sidebar on the left, click on "Clients".

    Click on "+ Create client".

    From "Application type", pick "Web application".

    This screen will appear:

    ![](assets/client-ids.png)

    In "Name", pick anything you want. "Yatsu" is ok for example.

    Under "Authorized JavaScript origins", click on "+ Add URI" and enter the `https://app.yatsu.moe` URL.

    Under "Authorized redirect URIs" click on "+ Add URI" and enter `https://app.yatsu.moe/auth`.

    Click on the blue "Create" button at the bottom of the page.

    You will see a dialog pop up, where you will see your Client ID and your Client secret. Save and store them somewhere, because you will need them later in Yatsu:

    !!! important

        Once you close this dialog, you will not be able to see your client secret again. Take note of it somewhere safe. If you lose your secret, you will not be able to connect that custom source to Drive.

    ![](assets/secrets.png)

    Lastly, click on "Audience" on the left, and then click on "Publish app".

    ![](assets/publish-app.png)

    That's it when it comes to the Google side. Now, in Yatsu, go to Settings, and then click on "Data". Scroll down to "Sync and Sources" and open that box. Then, click on "+ Add":

    ![](assets/yatsu-sources.png)

    This dialog will appear:

    ![](assets/yatsu-setup.png)

    In Name, put whatever you wish.

    Pick "Google Drive" from the provider dropdown.

    In "Behavior", pick whatever behavior suits you best.

    In "Credentials", enter the Client ID and Client Secret that you stored before.

    In Protection, you may optionally set a password which will be asked by Yatsu every single time you load books.

    Click on "Save".

    From Yatsu's library, you can now select your storage source and see the books that have been stored there:

    ![](assets/yatsu-select.png)
