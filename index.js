var through = require('through2');
var beautify = require('js-beautify');

module.exports = function(opts) {

  return through.obj(function(file, enc, cb) {
    if (file.isNull()) return cb(null, file); // pass along
    if (file.isStream()) return cb(new Error('gulp-jsbeautify: Streaming not supported'));

    var str = file.contents.toString('utf-8');
    file.contents = new Buffer(beautify(str, opts));
    cb(null, file);
  });

};
