var _ = require("lodash");

/**
 * Set the metadata property 'url' based on the property 'slug'
 */
function setUrl() {
  return function(files, metalsmith, done) {
    _.forEach(files, function(fileMeta, fileName) {
      if (fileMeta.slug) {
        fileMeta.url = "/" + fileMeta.slug;
        if (fileMeta.slug == "index") {
          fileMeta.url = "/";
        }
      }
    });
    done();
  };
}

module.exports = setUrl;
