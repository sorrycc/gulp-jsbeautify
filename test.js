var beautify = require('./');
var jsbeautify = require('js-beautify');
var gutil = require('gulp-util');

describe('gulp-jsbeautify', function() {

  it('main', function(done) {
    var content = 'function test(){console.log(\'test\');}';
    var stream = beautify({indent_size: 2});

    stream.on('error', done);
    stream.on('data', function(newFile){
      var expected = jsbeautify(content, {indent_size: 2});
      String(newFile.contents).should.equal(expected);
      done();
    });

    stream.write(new gutil.File({
      path: '/home/contra/test/file.js',
      base: '/home/contra/test/',
      cwd: '/home/contra/',
      contents: new Buffer(content)
    }));
  });
});
