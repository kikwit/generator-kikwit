'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-kikwit:app', (done) => {
    
    describe('viewEngine, mocha, chai, autoRestart', () => {
        
        let destinationPath;
        
        it('creates website files', () => {
                    
            helpers.run(path.join(__dirname, '../generators/app'))
                .withPrompts({
                    appName: 'test-app',
                    appType: 'website',
                    testingFramework: 'mocha',
                    viewEngine: 'dustjs-linkedin',
                    assertionLibrary: 'chai',
                    autoRestartOnChange: true,
                    skipDependencyInstall: true
                })
                .on('ready', gen => {
                    
                    destinationPath = gen.options.env.cwd;
                    gen.skipDependencyInstall = true;
                })
                .on('end', () => {
                    
                    assert.file(
                        resolveFilePaths(
                            'package.json',
                            'app.js',
                            'boot.js',
                            '.babelrc'
                    ));
                    
                    assert.fileContent([
                        [resolveFilePath('app.js'), "import consolidate from 'consolidate';"]
                    ]);
                });          
        });
    });

    describe('dustjs-linkedin', () => {
        
        let destinationPath;
            
        it('creates website files', () => {
                    
            helpers.run(path.join(__dirname, '../generators/app'))
                .withPrompts({
                    appName: 'test-app',
                    appType: 'website',
                    testingFramework: 'mocha',
                    viewEngine: 'dustjs-linkedin',
                    assertionLibrary: 'chai',
                    autoRestartOnChange: true,
                    skipDependencyInstall: true
                })
                .on('ready', gen => {
                    destinationPath = gen.options.env.cwd;
                    gen.skipDependencyInstall = true;
                })
                .on('end', () => {
                    
                    assert.file(
                        resolveFilePath('views/Products/list.dust')
                    );
                    
                    assert.fileContent([
                        [resolveFilePath('app.js'), "defaultEngine: 'dust'"],
                        [resolveFilePath('app.js'), "dust: consolidate['dust']"],
                        [resolveFilePath('views/Products/list.dust'), '{! dustjs-linkedin file !}']
                    ]);
                });          
        });
    });

    describe('ejs', () => {
        
        let destinationPath;
        
        it('creates website files', () => {
                    
            helpers.run(path.join(__dirname, '../generators/app'))
                .withPrompts({
                    appName: 'test-app',
                    appType: 'website',
                    testingFramework: 'mocha',
                    viewEngine: 'ejs',
                    assertionLibrary: 'chai',
                    autoRestartOnChange: true,
                    skipDependencyInstall: true
                })
                .on('ready', gen => {
                    destinationPath = gen.options.env.cwd;
                    gen.skipDependencyInstall = true;
                })
                .on('end', () => {
                    
                    assert.file(
                        resolveFilePaths('views/Products/list.ejs')
                    );
                    
                    assert.fileContent([
                        [resolveFilePath('app.js'), "defaultEngine: 'ejs'"],
                        [resolveFilePath('app.js'), "ejs: consolidate['ejs']"],
                        [resolveFilePath('views/Products/list.ejs'), '<%# ejs file %>']
                    ]);
                });          
        });
    });

    describe('handlebars', () => {
        
        let destinationPath;    
        
        it('creates website files', () => {
                    
            helpers.run(path.join(__dirname, '../generators/app'))
                .withPrompts({
                    appName: 'test-app',
                    appType: 'website',
                    testingFramework: 'mocha',
                    viewEngine: 'handlebars',
                    assertionLibrary: 'chai',
                    autoRestartOnChange: true,
                    skipDependencyInstall: true
                })
                .on('ready', gen => {
                    destinationPath = gen.options.env.cwd;
                    gen.skipDependencyInstall = true;
                })
                .on('end', () => {
                    
                    assert.file(
                        resolveFilePaths('views/Products/list.hbs')
                    );
                    
                    assert.fileContent([
                        [resolveFilePath('app.js'), "defaultEngine: 'hbs'"],
                        [resolveFilePath('app.js'), "hbs: consolidate['handlebars']"],
                        [resolveFilePath('views/Products/list.hbs'), '{{!-- handlebars file --}}']
                    ]);
                });          
        });
    });

    describe('jade', () => {
        
        let destinationPath;
                
        it('creates website files', () => {
                    
            helpers.run(path.join(__dirname, '../generators/app'))
                .withPrompts({
                    appName: 'test-app',
                    appType: 'website',
                    testingFramework: 'mocha',
                    viewEngine: 'jade',
                    assertionLibrary: 'chai',
                    autoRestartOnChange: true,
                    skipDependencyInstall: true
                })
                .on('ready', gen => {
                    destinationPath = gen.options.env.cwd;
                    gen.skipDependencyInstall = true;
                })
                .on('end', () => {
                    
                    assert.file(
                        resolveFilePaths('views/Products/list.jade')
                    );
                    
                    assert.fileContent([
                        [resolveFilePath('app.js'), "defaultEngine: 'jade'"],
                        [resolveFilePath('app.js'), "jade: consolidate['jade']"],
                        [resolveFilePath('views/Products/list.jade'), '//- Jade file']
                    ]);
                });          
        });
    });

    describe('mustache', () => {
        
        let destinationPath;
            
        it('creates website files', () => {
                    
            helpers.run(path.join(__dirname, '../generators/app'))
                .withPrompts({
                    appName: 'test-app',
                    appType: 'website',
                    testingFramework: 'mocha',
                    viewEngine: 'mustache',
                    assertionLibrary: 'chai',
                    autoRestartOnChange: true,
                    skipDependencyInstall: true
                })
                .on('ready', gen => {
                    destinationPath = gen.options.env.cwd;
                    gen.skipDependencyInstall = true;
                })
                .on('end', () => {
                    
                    assert.file(
                        resolveFilePaths('views/Products/list.mustache')
                    );
                    
                    assert.fileContent([
                        [resolveFilePath('app.js'), "defaultEngine: 'mustache'"],
                        [resolveFilePath('app.js'), "mustache: consolidate['mustache']"],
                        [resolveFilePath('views/Products/list.mustache'), '{{! mustache file }}']
                    ]);
                });          
        });
    });

    describe('nunjucks', () => {
        
        let destinationPath;
        
        it('creates website files', () => {
                    
            helpers.run(path.join(__dirname, '../generators/app'))
                .withPrompts({
                    appName: 'test-app',
                    appType: 'website',
                    testingFramework: 'mocha',
                    viewEngine: 'nunjucks',
                    assertionLibrary: 'chai',
                    autoRestartOnChange: true,
                    skipDependencyInstall: true
                })
                .on('ready', gen => {
                    destinationPath = gen.options.env.cwd;
                    gen.skipDependencyInstall = true;
                })
                .on('end', () => {
                    
                    assert.file(
                        resolveFilePaths('views/Products/list.html')
                    );
                    
                    assert.fileContent([
                        [resolveFilePath('app.js'), "defaultEngine: 'html'"],
                        [resolveFilePath('app.js'), "html: consolidate['nunjucks']"],
                        [resolveFilePath('views/Products/list.html'), '{# nunjucks file #}']
                    ]);
                });          
        });
    });

    describe('vash', () => {
        
        let destinationPath;
        
        it('creates website files', () => {
                    
            helpers.run(path.join(__dirname, '../generators/app'))
                .withPrompts({
                    appName: 'test-app',
                    appType: 'website',
                    testingFramework: 'mocha',
                    viewEngine: 'vash',
                    assertionLibrary: 'chai',
                    autoRestartOnChange: true,
                    skipDependencyInstall: true
                })
                .on('ready', gen => {
                      
                    destinationPath = gen.options.env.cwd;
                    gen.skipDependencyInstall = true;
                })
                .on('end', () => {
           
                    assert.file(
                        resolveFilePaths('views/Products/list.vash')
                    );
                    
                    assert.fileContent([
                        [resolveFilePath('app.js'), "defaultEngine: 'vash'"],
                        [resolveFilePath('app.js'), "vash: consolidate['vash']"],
                        [resolveFilePath('views/Products/list.vash'), '@* vash file *@']
                    ]);
                });          
        });
        
        done();
    });
                
    function resolveFilePaths(...filePaths) {
        return filePaths.map(resolveFilePath);
    }

    function resolveFilePath(filePath) {
        return path.join(destinationPath, filePath);
    }

});
