'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generator-kikwit:app', function () {
    
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({appName: 'test-kikwit'})
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'dummyfile.txt'
    ]);
  });
});
