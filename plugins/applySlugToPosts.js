var _ = require("lodash");
var path = require("path");

/**
 * Rename blog posts according to their slug. Put each post
 * in a separate directory.
 */
function applySlugToPosts() {
  return function(files, metalsmith, done) {
    _.forEach(files, function(fileMeta, fileName) {
      if (fileMeta.slug && fileMeta.collection && fileMeta.collection.indexOf("posts") >= 0) {
        var out = path.join("blog", fileMeta.slug, "index.html");
        var data = files[fileName];
        delete files[fileName];
        files[out] = data;
      }
    });
    done();
  };
}

module.exports = applySlugToPosts;
