const colors = require("ansi-colors");
const connect = require("connect");
const compress = require("compression");
const del = require("del");
const fs = require("fs");
const gulp = require("gulp");
const linkify = require("remarkable/linkify").linkify;
const log = require("fancy-log");
const md5 = require("md5");
const path = require("path");
const prettyHrtime = require("pretty-hrtime");
const serveStatic = require("serve-static");

const Metalsmith = require("metalsmith");
const applySlugToPosts = require("./plugins/applySlugToPosts");
const assetFile = require("./plugins/assetFile");
const assets = require("metalsmith-assets");
const branch = require("metalsmith-branch");
const brotli = require("metalsmith-brotli");
const collections = require("metalsmith-collections");
const dateInFilename = require("metalsmith-date-in-filename");
const define = require("metalsmith-define");
const excerpts = require("metalsmith-excerpts");
const gzip = require("metalsmith-gzip");
const htmlMinifier = require("metalsmith-html-minifier");
const markdown = require("metalsmith-markdown-remarkable");
const paginate = require("metalsmith-paginate");
const rename = require("./plugins/rename");
const sass = require("metalsmith-sass");
const setSitemapDate = require("./plugins/setSitemapDate");
const setUrlAndId = require("./plugins/setUrlAndId");
const sitemap = require("metalsmith-sitemap");
const slugFromFilename = require("./plugins/slugFromFilename");
const templates = require("./plugins/templates");
const uglify = require("metalsmith-uglify");

const authors = require("./authors.json");

const node_modules = "node_modules";

const paths = {
  site: "site",
  src: "src",
  src_docs_md: "build/src-gen/georocket-docs-md",
  src_docs: "build/docs",
  templates: "templates"
};

function build(done, dev) {
  let canonicalUrl = "https://georocket.io";
  let siteUrl = canonicalUrl;
  if (dev) {
    siteUrl = "http://localhost:4000";
  }

  // calculate gravatar URLs for all authors
  Object.keys(authors).forEach(author => {
    let a = authors[author];
    a.gravatar = "https://www.gravatar.com/avatar/" + md5(a.email);
  });

  Metalsmith(__dirname)
    // configure Metalsmith
    .source(paths.src)
    .destination(paths.site)

    // define global metadata
    .use(define({
      site: {
        url: siteUrl,
        canonicalurl: canonicalUrl,
        time: Date.now(),
        authors: authors
      }
    }))

    // extract dates from filename
    .use(dateInFilename(true))

    // group posts into collection
    .use(collections({
      posts: {
        pattern: "blog/**/2*",
        sortBy: "date",
        reverse: true
      }
    }))

    // apply pagination
    .use(paginate({
      perPage: 6,
      path: "page"
    }))

    // rename pagination files
    .use(rename("page-*.md", function(name) {
      return name.replace(/page-([0-9]+)/, "blog/$1/index");
    }))

    // extract slugs from filename
    .use(slugFromFilename())

    // set 'url' property needed in templates
    .use(setUrlAndId())

    // apply template engine to special files (apply in place)
    .use(templates({
      pattern: "robots.txt",
      inPlace: true,
      dev: dev
    }))

    // apply template engine to markdown files only (apply in-place)
    .use(templates({
      pattern: "**/*.md",
      inPlace: true,
      dev: dev
    }))

    // convert markdown to HTML
    .use(markdown({
      html: true,
      typographer: true
    }).use(linkify))

    // move posts to their own subdirectory
    .use(applySlugToPosts())

    // extract excerpts
    .use(excerpts())

    // apply template engine to all files
    .use(templates({
      dev: dev
    }))

    // copy required javascripts
    .use(assetFile(path.join(node_modules, "fixed-sticky/fixedsticky.js"),
        "js/fixedsticky.js"))
    .use(assetFile(path.join(node_modules, "fixed-sticky/fixedsticky.css"),
        "js/fixedsticky.css"))

    // minify javascripts
    .use(uglify({
      removeOriginal: true,
      uglify: {
        output: {
          comments:"some"
        }
      }
    }))

    // copy required javascripts (already minified)
    .use(assetFile(path.join(node_modules, "bootstrap/dist/js/bootstrap.min.js"),
        "js/bootstrap.min.js"))
    .use(assetFile(path.join(node_modules, "jquery/dist/jquery.min.js"),
        "js/jquery.min.js"))
    .use(assetFile(path.join(node_modules, "dotdotdot-js/dist/dotdotdot.js"),
        "js/jquery.dotdotdot.min.js"))
    .use(assetFile(path.join(node_modules, "popper.js/dist/umd/popper.min.js"),
        "js/popper.min.js"))
    .use(assetFile(path.join(node_modules, "scrollme/jquery.scrollme.min.js"),
        "js/jquery.scrollme.min.js"))
    .use(assetFile(path.join(node_modules, "tether/dist/js/tether.min.js"),
        "js/tether.min.js"))
    .use(assetFile(path.join(node_modules, "@mdi", "font", "css", "materialdesignicons.min.css"),
        "css/materialdesignicons.min.css"))
    .use(assetFile(path.join(node_modules, "@mdi", "font", "fonts", "materialdesignicons-webfont.eot"),
        "fonts/materialdesignicons-webfont.eot"))
    .use(assetFile(path.join(node_modules, "@mdi", "font", "fonts", "materialdesignicons-webfont.ttf"),
        "fonts/materialdesignicons-webfont.ttf"))
    .use(assetFile(path.join(node_modules, "@mdi", "font", "fonts", "materialdesignicons-webfont.woff"),
        "fonts/materialdesignicons-webfont.woff"))
    .use(assetFile(path.join(node_modules, "@mdi", "font", "fonts", "materialdesignicons-webfont.woff2"),
        "fonts/materialdesignicons-webfont.woff2"))

    // copy javadocs
    .use(assets({
      source: paths.src_docs,
      destination: 'docs'
    }))

    // convert scss to css
    .use(sass({
      includePaths: [
        path.join(node_modules, "bootstrap/scss")
      ],
      sourceMap: dev,
      sourceMapContents: dev
    }))

    // generate sitemap
    .use(branch("**/index.html")
      .use(setSitemapDate())
      .use(sitemap({
        urlProperty: "url",
        hostname: siteUrl,
        modifiedProperty: "sitemapDate"
      }))
    )

    // minify HTML
    .use(htmlMinifier({
      minifierOptions: {
        minifyJS: true,
        minifyCSS: true
      }
    }))

    // generate compressed files
    .use(gzip())
    .use(brotli({
      brotli: {
        mode: 1
      }
    }))

    // build site
    .build(done);
}

function buildDev(done) {
  build(done, true);
}

function clean() {
  return del([paths.site]);
}

function watch() {
  // start web server
  let app = connect();
 
  app.use(compress());
  app.use(serveStatic(paths.site, {
    "index": ["index.html", "index.htm"]
  }));

  app.listen(4000, function() {
    log("Listening on port", colors.cyan("4000"), "...");
  });

  let sources = [
    path.join(paths.src, "**", "*"),
    path.join(paths.templates, "**", "*")
  ];

  return gulp.watch(sources, function(done) {
    log("Rebuilding ...");
    let start = process.hrtime();
    build(function() {
      log("Finished", "'" + colors.cyan("rebuilding") + "'",
          "after", colors.magenta(prettyHrtime(process.hrtime(start))));
      done();
    }, true);
  });
}

exports.build = build;
exports.clean = clean;
exports.watch = gulp.series(buildDev, watch);
exports.default = gulp.series(build);
