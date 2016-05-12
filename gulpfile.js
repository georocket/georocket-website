var bower = require("gulp-bower");
var connect = require("connect");
var compress = require("compression");
var del = require("del");
var fs = require("fs");
var gulp = require("gulp");
var gutil = require("gulp-util");
var path = require("path");
var prettyHrtime = require("pretty-hrtime");
var serveStatic = require("serve-static");

var Metalsmith = require("metalsmith");
var assetFile = require("./assetFile");
var assets = require("metalsmith-assets");
var define = require("metalsmith-define");
var markdown = require("metalsmith-markdown-remarkable");
var sass = require("metalsmith-sass");
var templates = require("./templates");

var bowerrc = JSON.parse(fs.readFileSync("./.bowerrc"));

var paths = {
  site: "site",
  src: "src",
  src_docs_md: "build/src-gen/georocket-docs-md",
  src_docs: "build/docs",
  templates: "templates"
};

function build(done, dev) {
  var canonicalUrl = "http://georocket.io";
  var siteUrl = canonicalUrl;
  if (dev) {
    siteUrl = "http://localhost:4000";
  }

  Metalsmith(__dirname)
    // configure Metalsmith
    .source(paths.src)
    .destination(paths.site)

    // define global metadata
    .use(define({
      site: {
        url: siteUrl,
        canonicalurl: canonicalUrl,
        time: Date.now()
      }
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
      linkify: true,
      typographer: true
    }))

    // apply template engine to all files
    .use(templates({
      dev: dev
    }))

    // copy required javascripts
    .use(assetFile(path.join(bowerrc.directory, "scrollme/jquery.scrollme.min.js"),
        "js/jquery.scrollme.min.js"))
    .use(assetFile(path.join(bowerrc.directory, "filament-fixed/fixedfixed.js"),
        "js/fixedfixed.js"))
    .use(assetFile(path.join(bowerrc.directory, "filament-sticky/fixedsticky.js"),
        "js/fixedsticky.js"))
    .use(assetFile(path.join(bowerrc.directory, "filament-sticky/fixedsticky.css"),
        "js/fixedsticky.css"))

    // copy javadocs
    .use(assets({
      source: paths.src_docs,
      destination: 'docs'
    }))

    // convert scss to css
    .use(sass({
        includePaths: [
            path.join(bowerrc.directory, "bootstrap/scss")
        ]
    }))

    // build site
    .build(done);
}

gulp.task("bower", function() {
  return bower();
});

gulp.task("build", ["bower"], function(done) {
  build(done);
});

gulp.task("buildDev", ["bower"], function(done) {
  build(done, true);
});

gulp.task("watch", ["buildDev"], function() {
  // start web server
  var app = connect();
  app.use(compress());
  app.use(serveStatic(paths.site, {
    "index": ["index.html", "index.htm"]
  }));
  app.listen(4000, function() {
    gutil.log("Listening on port", gutil.colors.cyan("4000"), "...");
  });

  return gulp.watch([
      path.join(paths.src, "**", "*"),
      path.join(paths.templates, "**", "*")
    ], {}, function() {
    gutil.log("Rebuilding ...");
    var start = process.hrtime();
    build(function() {
      gutil.log("Finished", "'" + gutil.colors.cyan("rebuilding") + "'",
          "after", gutil.colors.magenta(prettyHrtime(process.hrtime(start))));
    }, true);
  });
});

gulp.task("clean", function(cb) {
  del([bowerrc.directory, paths.site], cb);
});

gulp.task("default", ["build"]);
