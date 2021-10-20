# scan-image-with-gps

List files with (Exif) GPS data by scanning directories recursively.

## Install

This script relys on [GraphicsMagick](http://www.graphicsmagick.org/) or [ImageMagick](https://imagemagick.org/index.php).

Example in Mac OS:

```bash
$ brew install imagemagick
# or
$ brew install graphicsmagick
```

Then

```bash
$ npm i
```

## Usage

```bash
$ npm run list [target-dir-here]
```

If you want to scan current directory, run `npm run list .`. 

Output:
```bash
Scanning 110617 files...
foo.jpeg # This file has GPS data
dir/bar.jpg # This file has GPS data
...
Failed to parse: dir/baz.md # Failed since this file is not a image.
...
Done!
```

If you want output to echo only filenames that have GPS, set `--silent` option.
```bash
$ npm run list -- [target-dir-here] --silent
# e.g. rpm run list --. --silent
```