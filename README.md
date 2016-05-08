GeoRocket Website [![Build Status](https://travis-ci.org/georocket/georocket-website.svg?branch=master)](https://travis-ci.org/georocket/georocket-website)
=================

This is the source code of the GeoRocket website <http://georocket.io>.

Building
--------

    ./gradlew build

This will perform a full build. The compiled website will be placed in the
`site` directory.

    gulp

Once the full build has succeeded it's sufficient to run `gulp` to just rebuild
the static HTML pages. You only need to perform a full build again if you want
to fetch the lastest documentation snapshots.

    `gulp watch`

You may also run `gulp watch` to run a web server on <http://localhost:4000> and
to watch for changes on the source files in the background.
