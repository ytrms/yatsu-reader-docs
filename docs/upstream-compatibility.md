Yatsu comes from ttsu, and one of my goals is that people should be able to use both without worrying that one will ruin the other's data.

If you connect both Yatsu and ttsu to the same Google Drive folder, the intended result is that both apps can keep using that same library.

## Short version

Yes, using Yatsu and ttsu together is supported.

In normal use:

- Books saved by ttsu should continue to work in Yatsu.
- Books saved by Yatsu should continue to work in ttsu.
- Using one app should not make your library unusable in the other.

## What this means in practice

If you already use ttsu and want to try Yatsu, you do not need to make a separate Google Drive folder just for Yatsu.

If you already use Yatsu and occasionally open the same library in ttsu, that should also be ok.

Yatsu may store a little more information than ttsu does, but it does so in a way that ttsu is expected to ignore rather than break on.

## Things that may still look different

Compatibility does not mean the two apps are identical.

For example:

- Yatsu may show extra metadata that ttsu does not use
- Yatsu-specific features may store extra files that ttsu simply ignores
- some changes may appear in one app before the other if sync has not completed yet

That is normal. The important part is that your library should remain usable in both.

## FAQ

### Do I need two different Google Drive folders?

No. If you want to use both Yatsu and ttsu, the goal is that one shared folder should be enough.

### Can Yatsu make my ttsu library unusable?

That is exactly what I try to avoid.

While no sync system is perfect, Yatsu is intentionally written so that its extra data should not make ttsu unable to read your books.

??? info "Technical details"

    Yatsu uses the same general cloud folder layout as ttsu.

    Extra Yatsu-only data is stored in separate files, rather than by changing the shape of ttsu's main book files.

??? info "What Yatsu stores in addition to ttsu"

    Yatsu can store extra per-book metadata such as library metadata and highlights.

    These are stored as additional files alongside the normal book data, so ttsu can ignore them if it does not know about them.[^1]

## If something seems wrong

If a shared Yatsu/ttsu library behaves strangely, please report it.

It is especially helpful to say:

- whether you are using Google Drive
- whether the same folder is connected in both Yatsu and ttsu
- whether the issue happens only in one app or in both
- whether the problem goes away after waiting a bit and refreshing

[^1]: In other words, Yatsu tries to extend the shared storage format additively, not by replacing ttsu's core data format with a different one.
