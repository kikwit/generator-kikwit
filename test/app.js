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
                        resolveFilePath('views/Home/index.dust')
                    );
                    
                    assert.fileContent([
                        [resolveFilePath('app.js'), "defaultEngine: 'dust'"],
                        [resolveFilePath('app.js'), "dust: consolidate['dust']"],
                        [resolveFilePath('views/Home/index.dust'), '{! dustjs-linkedin file !}']
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
                        resolveFilePaths('views/Home/index.ejs')
                    );
                    
                    assert.fileContent([
                        [resolveFilePath('app.js'), "defaultEngine: 'ejs'"],
                        [resolveFilePath('app.js'), "ejs: consolidate['ejs']"],
                        [resolveFilePath('views/Home/index.ejs'), '<%# ejs file %>']
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
                        resolveFilePaths('views/Home/index.hbs')
                    );
                    
                    assert.fileContent([
                        [resolveFilePath('app.js'), "defaultEngine: 'hbs'"],
                        [resolveFilePath('app.js'), "hbs: consolidate['handlebars']"],
                        [resolveFilePath('views/Home/index.hbs'), '{{!-- handlebars file --}}']
                    ]);
                });          
        });
    });

    describe('pug', () => {
        
        let destinationPath;
                
        it('creates website files', () => {
                    
            helpers.run(path.join(__dirname, '../generators/app'))
                .withPrompts({
                    appName: 'test-app',
                    appType: 'website',
                    testingFramework: 'mocha',
                    viewEngine: 'pug',
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
                        resolveFilePaths('views/Home/index.pug')
                    );
                    
                    assert.fileContent([
                        [resolveFilePath('app.js'), "defaultEngine: 'pug'"],
                        [resolveFilePath('app.js'), "pug: consolidate['pug']"],
                        [resolveFilePath('views/Home/index.pug'), '//- Pug file']
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
                        resolveFilePaths('views/Home/index.mustache')
                    );
                    
                    assert.fileContent([
                        [resolveFilePath('app.js'), "defaultEngine: 'mustache'"],
                        [resolveFilePath('app.js'), "mustache: consolidate['mustache']"],
                        [resolveFilePath('views/Home/index.mustache'), '{{! mustache file }}']
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
                        resolveFilePaths('views/Home/index.html')
                    );
                    
                    assert.fileContent([
                        [resolveFilePath('app.js'), "defaultEngine: 'html'"],
                        [resolveFilePath('app.js'), "html: consolidate['nunjucks']"],
                        [resolveFilePath('views/Home/index.html'), '{# nunjucks file #}']
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
                        resolveFilePaths('views/Home/index.vash')
                    );
                    
                    assert.fileContent([
                        [resolveFilePath('app.js'), "defaultEngine: 'vash'"],
                        [resolveFilePath('app.js'), "vash: consolidate['vash']"],
                        [resolveFilePath('views/Home/index.vash'), '@* vash file *@']
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
