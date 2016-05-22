var async = require("async");
var extend = require("extend");
var fs = require("fs");
var match = require("multimatch");
var nunjucks = require("nunjucks");
var nunjucksDate = require("nunjucks-date");

/**
 * Applies the nunjucks template engine. Code has been copied from the
 * metalsmith-templates plugin but slightly modified to only support nunjucks
 * The metalsmith-templates plugin is released under the MIT license.
 * https://github.com/segmentio/metalsmith-templates
 */
function templates(opts) {
    opts = opts || {};
    var dir = opts.directory || 'templates';
    var pattern = opts.pattern;
    var inPlace = opts.inPlace;
    var dev = opts.dev;

    return function(files, metalsmith, done) {
        var metadata = metalsmith.metadata();

        async.each(Object.keys(files), convert, done);

        function check(file) {
            if (pattern && !match(file, pattern)[0]) {
                return false;
            }

            var data = files[file];
            var tmpl = data.template;
            if (!inPlace && !tmpl) {
                return false;
            }

            return true;
        }

        function convert(file, done) {
            if (!check(file)) {
                return done();
            }

            var data = files[file];

            var str;
            if (inPlace) {
                str = data.contents.toString();
            } else {
                str = fs.readFileSync(metalsmith.path(dir, data.template));
                str = str.toString();
            }

            var clone = extend({}, metadata, data);
            var env = new nunjucks.Environment(new nunjucks.FileSystemLoader(dir, {
                noCache: dev
            }));
            nunjucksDate.install(env);
            env.renderString(str, clone, function(err, str) {
                if (err) {
                    return done(err);
                }

                data.contents = new Buffer(str);
                done();
            });
        }
    };
}

module.exports = templates;
