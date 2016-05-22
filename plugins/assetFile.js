var fs = require("fs");

/**
 * Copy a file
 */
function assetFile(source, dest) {
    return function(files, metalsmith, done) {
        fs.readFile(source, function(err, data) {
            if (err) {
                return done(err);
            }
            files[dest] = {
                contents: data
            };
            done();
        });
    };
}

module.exports = assetFile;
