const _ = require("lodash");

/**
 * Set the metadata properties 'url' and 'id' based on the property 'slug'
 */
function setUrlAndId() {
  return function(files, metalsmith, done) {
    _.forEach(files, function(fileMeta, fileName) {
      if (fileMeta.slug) {
        if (!fileMeta.id) {
          fileMeta.id = fileMeta.slug.replace(/\W/g, '-');
        }
        fileMeta.url = "/" + fileMeta.slug;
        if (fileMeta.slug == "index") {
          fileMeta.url = "/";
        }
      }
    });
    done();
  };
}

module.exports = setUrlAndId;
