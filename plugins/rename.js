var async = require("async");
var match = require("multimatch");

function rename(pattern, renameCallback) {
  return function(files, metalsmith, done) {
    async.each(Object.keys(files), doRename, done);

    function doRename(file, done) {
      if (!match(file, pattern)[0]) {
        done();
        return;
      }

      var newName = renameCallback(file);
      var f = files[file];
      delete files[file];
      files[newName] = f;
      done();
    }
  };
}

module.exports = rename;
