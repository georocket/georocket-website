var _ = require("lodash");

/**
 * Extract slug from file name with pattern YYYY-mm-dd-<permalink>.ext and
 * save it in a 'slug' metadata property
 */
function slugFromFilename() {
  return function(files, metalsmith, done) {
    _.forEach(files, function(fileMeta, fileName) {
      var m;
      if (m = fileName.match(/\d{4}-\d{2}-\d{2}-(.*)\..*$/)) {
        fileMeta.slug = m[1];
      } else if (m = fileName.match(/(.*)[\\\/]index\..*$/)) {
        fileMeta.slug = m[1];
      } else if (m = fileName.match(/(.*)\..*$/)) {
        fileMeta.slug = m[1];
      }
    });
    done();
  };
}

module.exports = slugFromFilename;
