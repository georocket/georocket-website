const async = require("async");
const extend = require("extend");
const fs = require("fs");
const match = require("multimatch");
const nunjucks = require("nunjucks");
const nunjucksDate = require("nunjucks-date");

/**
 * Applies the nunjucks template engine. Code has been copied from the
 * metalsmith-templates plugin but slightly modified to only support nunjucks
 * The metalsmith-templates plugin is released under the MIT license.
 * https://github.com/segmentio/metalsmith-templates
 */
function templates(opts) {
    opts = opts || {};
    let dir = opts.directory || 'templates';
    let pattern = opts.pattern;
    let inPlace = opts.inPlace;
    let dev = opts.dev;

    return function(files, metalsmith, done) {
        let metadata = metalsmith.metadata();

        async.each(Object.keys(files), convert, done);

        function check(file) {
            if (pattern && !match(file, pattern)[0]) {
                return false;
            }

            let data = files[file];
            let tmpl = data.template;
            if (!inPlace && !tmpl) {
                return false;
            }

            return true;
        }

        function convert(file, done) {
            if (!check(file)) {
                return done();
            }

            let data = files[file];

            let str;
            if (inPlace) {
                str = data.contents.toString();
            } else {
                str = fs.readFileSync(metalsmith.path(dir, data.template));
                str = str.toString();
            }

            let clone = extend({}, metadata, data);
            let env = new nunjucks.Environment(new nunjucks.FileSystemLoader(dir, {
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
