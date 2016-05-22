var _ = require("lodash");
var moment = require("moment");

/**
 * Convert 'date' property to a 'sitemapDate' property suitable for sitemap.xml
 */
function setSitemapDate() {
  return function(files, metalsmith, done) {
    _.forEach(files, function(fileMeta, fileName) {
      if (fileMeta.date) {
        fileMeta.sitemapDate = moment(fileMeta.date).format("YYYY-MM-DD");
      }
    })
    done();
  }
}

module.exports = setSitemapDate;
