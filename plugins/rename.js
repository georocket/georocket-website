const each = require("async/each");
const match = require("multimatch");

function rename(pattern, renameCallback) {
  return function(files, metalsmith, done) {
    each(Object.keys(files), doRename, done);

    function doRename(file, done) {
      if (!match(file, pattern)[0]) {
        done();
        return;
      }

      let newName = renameCallback(file);
      let f = files[file];
      delete files[file];
      files[newName] = f;
      done();
    }
  };
}

module.exports = rename;
