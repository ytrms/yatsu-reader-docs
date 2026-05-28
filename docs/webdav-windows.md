# Windows WebDAV Setup

This guide shows one reliable Windows setup for Yatsu WebDAV storage:

- `rclone` serves a local Windows folder as WebDAV on `127.0.0.1`.
- `Caddy` adds the browser CORS headers Yatsu needs and either exposes HTTPS
  itself or sits behind a tunnel that provides the public HTTPS URL.
- Yatsu connects to the public HTTPS URL, not directly to the local rclone
  address.

This is the recommended pattern for the hosted Yatsu app. Direct WebDAV servers
often fail in browsers because they do not allow `PROPFIND`, `MKCOL`, `PUT`,
`MOVE`, `DELETE`, or the `Authorization` header in CORS preflight requests.

## What Yatsu Needs

Yatsu expects a WebDAV collection where it can create and manage a
`yatsu-reader-data` folder. The WebDAV endpoint must:

- be reachable from the browser where Yatsu is running
- use HTTPS when you use the hosted Yatsu app at `https://app.yatsu.moe`
- accept Basic auth or another password-based WebDAV login that sends an
  `Authorization` header
- allow `OPTIONS`, `PROPFIND`, `MKCOL`, `GET`, `PUT`, `MOVE`, and `DELETE`
- allow the request headers `Authorization`, `Content-Type`, `Depth`,
  `Destination`, and `Overwrite`
- expose `Content-Length`, `ETag`, and `Last-Modified`
- let the account create folders, upload files, rename files, and delete files

!!! warning "Do not expose rclone directly"

    Bind rclone to `127.0.0.1` and put Caddy in front of it. Do not expose
    rclone's plain HTTP port directly to the internet.

## Before You Start

You need:

- a Windows 10 or Windows 11 PC that will stay online while you want sync
- a public HTTPS URL for WebDAV, either from a domain/subdomain such as
  `yatsu-webdav.example.com` or from a tunnel such as ngrok or Cloudflare Tunnel
- DNS and inbound access to Caddy on ports `80` and `443` if you use your own
  domain without a tunnel
- [rclone for Windows](https://rclone.org/downloads/)
- [Caddy for Windows](https://caddyserver.com/docs/install#windows)
- ngrok or cloudflared if you choose one of the tunnel options below
- a strong username and password for the WebDAV account

If you cannot provide a real HTTPS URL, use a tunnel or reverse proxy that gives
your WebDAV server one. The hosted Yatsu app cannot reliably connect to a plain
HTTP WebDAV URL because browsers block mixed-content requests from an HTTPS page.

## Choose a Public HTTPS URL

Yatsu only needs a public HTTPS URL that reaches the Caddy proxy from the browser.
It does not matter whether that URL comes from normal DNS, ngrok, or Cloudflare
Tunnel.

### Option A: Use Your Own Domain or Subdomain

A subdomain is a DNS name under a domain you control, such as
`yatsu-webdav.example.com`. In this setup, DNS points that name to the Windows PC
or router, and Caddy listens publicly on ports `80` and `443`.

Use this option if you already have a domain and can forward inbound HTTPS
traffic to the Windows PC. Use the public Caddyfile in step 5.

### Option B: Use ngrok

[ngrok](https://ngrok.com/docs/http/) can give you a public HTTPS URL without
router port forwarding. Free ngrok accounts include an automatically assigned
[Dev Domain](https://ngrok.com/docs/universal-gateway/domains/#dev-domains).
Paid plans can use custom domains or randomly generated URLs.

With ngrok, keep rclone on `127.0.0.1:8080`, run Caddy locally on
`127.0.0.1:18080` with the tunnel Caddyfile in step 5, then point ngrok at
Caddy:

```powershell
ngrok http 18080 --url https://your-ngrok-dev-domain.ngrok-free.app
```

Use the ngrok HTTPS URL as the WebDAV URL in Yatsu.

Do not point ngrok directly at rclone unless you also configure ngrok to handle
the same CORS and `OPTIONS` preflight behavior as the Caddyfile in this guide.

### Option C: Use Cloudflare Tunnel

[Cloudflare Tunnel](https://developers.cloudflare.com/tunnel/routing/) can expose
a local service through Cloudflare without opening router ports. If you already
use Cloudflare for a domain, create a named tunnel and map a public hostname to
the local Caddy proxy.

For quick testing, Cloudflare also provides temporary
[Quick Tunnels](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/trycloudflare/):

```powershell
cloudflared tunnel --url http://127.0.0.1:18080
```

Quick Tunnels return a `trycloudflare.com` HTTPS URL. They are useful for testing,
but the URL may change when the tunnel restarts. For regular use, prefer a stable
ngrok Dev Domain or a named Cloudflare Tunnel hostname.

## 1. Create the Storage Folder

Create a folder that will hold Yatsu's WebDAV files:

```powershell
New-Item -ItemType Directory -Force C:\YatsuWebDAV
```

You do not need to create `yatsu-reader-data` yourself. Yatsu creates it inside
this folder after the source is saved and used.

## 2. Install rclone

Download rclone for Windows from the official rclone site and extract it, for
example to:

```text
C:\Tools\rclone\
```

Open PowerShell and check that it runs:

```powershell
C:\Tools\rclone\rclone.exe version
```

## 3. Start rclone as a Local WebDAV Server

Choose a username and password. The examples below use `reader` and
`change-this-password`; replace them with your own values.

Run this in PowerShell:

```powershell
C:\Tools\rclone\rclone.exe serve webdav "C:\YatsuWebDAV" `
  --addr 127.0.0.1:8080 `
  --user reader `
  --pass "change-this-password" `
  --dir-cache-time 5s `
  -vv `
  --log-file "C:\YatsuWebDAV\rclone-webdav.log"
```

Leave this PowerShell window open while testing.

Test rclone locally from another PowerShell window:

```powershell
curl.exe -i -u reader:change-this-password -X PROPFIND "http://127.0.0.1:8080/"
```

You should get a WebDAV response, usually `207 Multi-Status`. If you get `401`,
the username or password is wrong. If you cannot connect, rclone is not running
or is listening on a different address.

## 4. Install Caddy

Download Caddy for Windows from the official Caddy site and place it somewhere
stable, for example:

```text
C:\Tools\caddy\caddy.exe
```

Create a Caddy config folder:

```powershell
New-Item -ItemType Directory -Force C:\Caddy
notepad C:\Caddy\Caddyfile
```

## 5. Configure Caddy for CORS and HTTPS

Use a dedicated subdomain if possible. This avoids path-prefix mistakes and
makes the WebDAV URL easy to copy into Yatsu.

Replace `yatsu-webdav.example.com` with your real subdomain:

```caddyfile
yatsu-webdav.example.com {
    @preflight method OPTIONS

    handle @preflight {
        header Access-Control-Allow-Origin "https://app.yatsu.moe"
        header Access-Control-Allow-Methods "OPTIONS, PROPFIND, MKCOL, GET, PUT, MOVE, DELETE"
        header Access-Control-Allow-Headers "Authorization, Content-Type, Depth, Destination, Overwrite"
        header Access-Control-Expose-Headers "Content-Length, ETag, Last-Modified"
        header Access-Control-Max-Age "86400"
        header Vary "Origin"
        respond "" 204
    }

    handle {
        header Access-Control-Allow-Origin "https://app.yatsu.moe"
        header Access-Control-Allow-Methods "OPTIONS, PROPFIND, MKCOL, GET, PUT, MOVE, DELETE"
        header Access-Control-Allow-Headers "Authorization, Content-Type, Depth, Destination, Overwrite"
        header Access-Control-Expose-Headers "Content-Length, ETag, Last-Modified"
        header Vary "Origin"
        reverse_proxy 127.0.0.1:8080
    }
}
```

If you are using ngrok or Cloudflare Tunnel, the tunnel provides the public HTTPS
URL. Use this local-only Caddyfile instead:

```caddyfile
http://127.0.0.1:18080 {
    @preflight method OPTIONS

    handle @preflight {
        header Access-Control-Allow-Origin "https://app.yatsu.moe"
        header Access-Control-Allow-Methods "OPTIONS, PROPFIND, MKCOL, GET, PUT, MOVE, DELETE"
        header Access-Control-Allow-Headers "Authorization, Content-Type, Depth, Destination, Overwrite"
        header Access-Control-Expose-Headers "Content-Length, ETag, Last-Modified"
        header Access-Control-Max-Age "86400"
        header Vary "Origin"
        respond "" 204
    }

    handle {
        header Access-Control-Allow-Origin "https://app.yatsu.moe"
        header Access-Control-Allow-Methods "OPTIONS, PROPFIND, MKCOL, GET, PUT, MOVE, DELETE"
        header Access-Control-Allow-Headers "Authorization, Content-Type, Depth, Destination, Overwrite"
        header Access-Control-Expose-Headers "Content-Length, ETag, Last-Modified"
        header Vary "Origin"
        reverse_proxy 127.0.0.1:8080
    }
}
```

Start Caddy:

```powershell
C:\Tools\caddy\caddy.exe run --config C:\Caddy\Caddyfile --adapter caddyfile
```

Leave this PowerShell window open while testing.

If you use the public subdomain Caddyfile, Caddy should obtain and renew the
HTTPS certificate automatically when DNS and inbound access are correct. For a
normal public DNS setup, Caddy usually needs ports `80` and `443` reachable from
the internet while it gets the certificate.

If you use the tunnel Caddyfile, Caddy only listens on the Windows PC. Start your
ngrok or Cloudflare Tunnel command after Caddy is running.

## 6. Test the Public WebDAV URL

From PowerShell, test the CORS preflight that browsers send before Yatsu's
WebDAV requests. Replace the example URL with your real public HTTPS URL:

```powershell
curl.exe -i -X OPTIONS "https://yatsu-webdav.example.com/" `
  -H "Origin: https://app.yatsu.moe" `
  -H "Access-Control-Request-Method: PROPFIND" `
  -H "Access-Control-Request-Headers: authorization,depth,content-type"
```

The response should be `204 No Content` and include:

```text
Access-Control-Allow-Origin: https://app.yatsu.moe
Access-Control-Allow-Methods: OPTIONS, PROPFIND, MKCOL, GET, PUT, MOVE, DELETE
Access-Control-Allow-Headers: Authorization, Content-Type, Depth, Destination, Overwrite
```

Then test authenticated WebDAV:

```powershell
curl.exe -i -u reader:change-this-password -X PROPFIND "https://yatsu-webdav.example.com/"
```

You should get `207 Multi-Status`.

Finally, test write permission:

```powershell
Set-Content -Path "$env:TEMP\yatsu-webdav-test.txt" -Value "Yatsu WebDAV test"

curl.exe -i -u reader:change-this-password -X MKCOL "https://yatsu-webdav.example.com/yatsu-test/"
curl.exe -i -u reader:change-this-password -T "$env:TEMP\yatsu-webdav-test.txt" "https://yatsu-webdav.example.com/yatsu-test/test.txt"
curl.exe -i -u reader:change-this-password -X DELETE "https://yatsu-webdav.example.com/yatsu-test/"
```

The `MKCOL` and upload requests should return a success status. The cleanup
`DELETE` should remove the temporary test folder.

## 7. Add the Source in Yatsu

1. Open Yatsu.
2. Go to **Settings** -> **Data** -> **Sources**.
3. Choose **Add source**.
4. Set **Provider** to **WebDAV (Beta)**.
5. Enter a name, such as `Home WebDAV`.
6. Enter the WebDAV URL. Use your real public HTTPS URL, whether it is your
   subdomain, ngrok Dev Domain, or Cloudflare Tunnel URL:

   ```text
   https://yatsu-webdav.example.com/
   ```

7. Enter the same username and password you passed to rclone.
8. Choose whether to use this source as the sync target or default WebDAV
   source.
9. Save the source.
10. Return to the Library and select **WebDAV (Beta)** from the storage picker.

After the first import or sync, the Windows folder should contain:

```text
C:\YatsuWebDAV\yatsu-reader-data\
```

Each book gets its own folder inside `yatsu-reader-data`. A complete synced
book folder should usually contain a `bookdata_...zip` file. If a folder only
contains `progress_`, `statistics_`, or `cover_` files, another browser can sync
reading data but cannot open the book until the full book data has been synced.
Open the book once from a browser that still has the full local copy, then sync
again.

## Optional: Run rclone and Caddy at Login

After everything works manually, you can use Windows Task Scheduler so both
processes start when you sign in.

Create one task for rclone:

- **Program**: `C:\Tools\rclone\rclone.exe`
- **Arguments**:

  ```text
  serve webdav "C:\YatsuWebDAV" --addr 127.0.0.1:8080 --user reader --pass "change-this-password" --dir-cache-time 5s --log-file "C:\YatsuWebDAV\rclone-webdav.log"
  ```

- **Start in**: `C:\Tools\rclone`

Create one task for Caddy:

- **Program**: `C:\Tools\caddy\caddy.exe`
- **Arguments**:

  ```text
  run --config C:\Caddy\Caddyfile --adapter caddyfile
  ```

- **Start in**: `C:\Caddy`

Use a normal foreground test first. Only add startup tasks after the manual
commands work.

## Troubleshooting

### Browser console shows a CORS error

The request did not reach Yatsu's WebDAV code. The browser blocked it first.
Check the Caddyfile:

- `Access-Control-Allow-Origin` must match the Yatsu page exactly.
- `Access-Control-Allow-Methods` must include `PROPFIND`.
- `Access-Control-Allow-Headers` must include `Authorization` and `Depth`.
- The `OPTIONS` test in this guide must return the CORS headers.

### Yatsu works locally but not from the hosted app

You are probably using a plain HTTP WebDAV URL. Hosted Yatsu runs on HTTPS, so
the WebDAV URL should also be HTTPS.

### Yatsu says the source cannot connect

Check the URL first. With the dedicated subdomain setup above, use:

```text
https://yatsu-webdav.example.com/
```

Do not enter the local rclone address in hosted Yatsu:

```text
http://127.0.0.1:8080/
```

That address only works from the Windows PC itself and does not satisfy HTTPS
requirements for the hosted app.

### Yatsu asks for credentials again or returns 401

Use the same username and password in Yatsu that you passed to `rclone serve
webdav`. If the password contains shell-sensitive characters, wrap it in quotes
in the rclone command.

### The library shows a book, but another browser cannot open it

The remote folder may have reading data but no full book data. Look in:

```text
C:\YatsuWebDAV\yatsu-reader-data\
```

The affected book folder needs a `bookdata_...zip` file. Open the book from a
browser that still has the local copy and let Yatsu sync; current Yatsu builds
will backfill the missing remote book data when possible.

### Uploads fail or sync only partly works

The account needs write, rename, and delete permission. Yatsu uses temporary
file updates and duplicate cleanup, so read-only WebDAV access is not enough.

### You want to use a path instead of a dedicated subdomain

The dedicated subdomain setup is simpler. If you must use a path such as
`https://example.com/yatsu-webdav/`, start rclone with a matching base URL:

```powershell
C:\Tools\rclone\rclone.exe serve webdav "C:\YatsuWebDAV" `
  --addr 127.0.0.1:8080 `
  --baseurl /yatsu-webdav/ `
  --user reader `
  --pass "change-this-password"
```

Then configure Caddy to proxy that path to rclone and enter the same path in
Yatsu. If the `--baseurl` value and the URL path do not match, directory listing
links can point to the wrong location.

## Reference

- [rclone `serve webdav`](https://rclone.org/commands/rclone_serve_webdav/)
- [Caddy `reverse_proxy`](https://caddyserver.com/docs/caddyfile/directives/reverse_proxy)
- [ngrok HTTP endpoints](https://ngrok.com/docs/http/)
- [Cloudflare Tunnel routing](https://developers.cloudflare.com/tunnel/routing/)
