'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-kikwit:app', () => {

    it('creates website files - jade, mocha, chai, autoRestart', done => {

        helpers.run(path.join(__dirname, '../generators/app'))
            .withPrompts({
                appName: 'test-app',
                appType: 'website',
                testingFramework: 'mocha',
                viewEngine: 'jade',
                assertionLibrary: 'chai',
                autoRestartOnChange: true
            })
            .on('end', done);        
        
        assert.file([
            'package.json',
            'app.js',
            'boot.js',
            '.babelrc',
            'views/Products/list.jade'
        ]);
        
        assert.fileContent([
            ['app.js', "import consolidate from 'consolidate';"]
            ['app.js', 'defaultEngine: jade'],
            ['app.js', 'jade: consolidate.jade']
            ['views/Products/list.jade', '//- Jade file']
        ]);
    });
});
