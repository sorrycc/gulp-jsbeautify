var beautify = require('../');
var jsbeautify = require('js-beautify');
var gutil = require('gulp-util');
var should = require('should');

describe('gulp-jsbeautify', function() {

  it('main', function(done) {
    var stream = beautify({indent_size: 2});
    var fakeFile = new gutil.File({
      path: '/home/contra/test/file.js',
      base: '/home/contra/test/',
      cwd: '/home/contra/',
      contents: new Buffer('function test(){console.log(\'test\');}')
    });

    var expected = jsbeautify.js_beautify(String(fakeFile.contents), {indent_size: 2});
    stream.on('error', done);
    stream.on('data', function(newFile){
      should.exist(newFile);
      should.exist(newFile.path);
      should.exist(newFile.relative);
      should.exist(newFile.contents);

      newFile.path.should.equal('/home/contra/test/file.js');
      newFile.relative.should.equal('file.js');
      String(newFile.contents).should.equal(expected);
      done();
    });
    stream.write(fakeFile);
  });
});
