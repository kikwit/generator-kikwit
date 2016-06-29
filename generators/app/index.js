'use strict';

var fs = require('fs');
var os = require('os');
var path = require('path');

var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

const consolidateVersion = '^0.14.1';

const viewEngines = [
    { name: 'DustJS-LinkedIn', value: 'dustjs-linkedin', extension: 'dust', consolidateKey: 'dust', version: '^2.7.2' },
    { name: 'EJS', value: 'ejs', extension: 'ejs', consolidateKey: 'ejs', version: '^2.4.2' },
    { name: 'Handlebars', value: 'handlebars', extension: 'hbs', consolidateKey: 'handlebars', version: '^4.0.5' },
    { name: 'Pug', value: 'pug', extension: 'pug', consolidateKey: 'pug', version: '^2.0.0-beta2' },
    { name: 'Marko', value: 'marko', extension: 'marko', renderFunction: markoRenderFunction, version: '^3.4.6'},
    { name: 'Mustache', value: 'mustache', extension: 'mustache', consolidateKey: 'mustache', version: '^2.2.1'},
    { name: 'Nunjucks', value: 'nunjucks', extension: 'html', consolidateKey: 'nunjucks', version: '^2.4.2' },
    { name: 'Vash', value: 'vash', extension: 'vash', consolidateKey: 'vash', version: '^0.12.1' },
    { name: 'None of the above', value: null }
];

const loggers = [
    { name: 'Bunyan', value: 'bunyan', logFunction: 'getBunyanLogFunction', version: '^1.8.1' },
    { name: 'Log4JS', value: 'log4js', logFunction: 'getLog4JSLogFunction', version: '^0.6.36' },
    { name: 'Winston', value: 'winston', logFunction: 'getWinstonLogFunction', version: '^2.2.0' },
    { name: 'None of the above', value: null }
];

const testingFrameworks = [
    { name: 'Jasmine', value: 'jasmine', version: '^2.4.1', npmScript: 'jasmine JASMINE_CONFIG_PATH=test/support/jasmine.json', copyFiles: (gen) => {
        gen.directory('tests/jasmin/test', 'test');
    }},
    { name: 'Mocha', value: 'mocha', version: '^2.5.3', npmScript: 'mocha --compilers js:babel-core/register test/**/*.js', copyFiles: (gen) => {
        gen.directory('tests/mocha/test', 'test');
    }},
    { name: 'Buster.js', value: 'buster', version:'^0.7.18', npmScript: 'buster-test --config tests/buster.js', copyFiles: (gen) => {

        gen.fs.copyTpl(
            gen.templatePath('tests/buster/buster.js'),
            gen.destinationPath('test/buster.js'),
            gen.options
        );
        gen.directory('tests/buster/test', 'test');
    }},
    { name: 'None of the above' }
];

const assertionLibraries = [
    { name: 'Chai', value: 'chai', version: '^3.5.0' },
    { name: 'Should.js', value: 'should', version: '^8.4.0' },
    { name: 'None of the above', value: null }
];

const dependencies = {
    'babel-core': '^6.10.4',
    'babel-plugin-transform-decorators-legacy': '^1.3.4',
    'babel-plugin-transform-es2015-modules-commonjs': '^6.10.3',
    'kikwit': '^0.6.1'
};

const autoRestartOnChangeDependency = {
    value: 'nodemon', version: '^1.9.2'   
};

module.exports = generators.Base.extend({

    constructor: function() {
        
        generators.Base.apply(this, arguments);
    },

    prompting: function() {
        
        let done = this.async();
        
        this.log(yosay(`Welcome to ${chalk.yellow.bold('Kikwit')} generator!`));

        let prompts = [
            {
                type: 'input',
                name: 'appName',
                message: 'Enter a name for your app:',
                default: this.appname
            },
            {
                type: 'list',
                name: 'appType',
                message: 'What sort of app are you creating?',
                choices: [
                    { name: "Website", value: 'website' },
                    { name: 'API', value: 'api' }
                ],
                default: 'website'
            },
            {
                type: 'list',
                name: 'viewEngine',
                message: 'Select a view engine',
                choices: viewEngines,
                when: function (answers) {
                    return answers.appType == 'website';
                }
            },
            {
                type: 'list',
                name: 'logger',
                message: 'Select a logger',
                choices: loggers
            },
            {
                type: 'list',
                name: 'testingFramework',
                message: 'Select a testing framework',
                choices: testingFrameworks
            },
            {
                type: 'list',
                name: 'assertionLibrary',
                message: 'Select an assertion library',
                choices: assertionLibraries,
                when: function (answers) {
                    return answers.testingFramework && answers.testingFramework == 'mocha';
                }
            },
            {
                type: 'confirm',
                name: 'autoRestartOnChange',
                message: 'Auto-restart the server on code change? (uses nodemon)',
                default: true
            },
        ];

        this.prompt(prompts).then(answers => {

            this.options = answers;
            
            if (this.options.appType == 'api') {
                this.options.viewEngine = null;
            }
            
            done();
        });
            
    },

    writing: function()  {
    
        var pkg = {
            name: this.options.appName,
            version: '0.1.0',
            main: 'boot.js',
            engines: {
                node: "^6.0.0"
            },
            scripts: {
                start: 'npm run -s development',
                test: 'echo "Error: no test specified" && exit 1'
            },
            dependencies: dependencies,
            devDependencies: {}
        };
        
        if (this.options.viewEngine) {
            
            let viewEngine = viewEngines.find(x => x.value == this.options.viewEngine);
            
            this.options.viewEngine = viewEngine;
            
            pkg.dependencies[viewEngine.value] = viewEngine.version;
            
            if (viewEngine.consolidateKey) {
                pkg.dependencies.consolidate = consolidateVersion;                
            }
        }
       
        if (this.options.logger) {
            
            let logger = loggers.find(x => x.value == this.options.logger);
            
            this.options.logger = logger;
            
            pkg.dependencies[logger.value] = logger.version;
        }
              
        if (this.options.testingFramework) {
            
            let testingFramework = testingFrameworks.find(x => x.value == this.options.testingFramework);
            
            if (testingFramework) {
             
                pkg.devDependencies[testingFramework.value] = testingFramework.version;
                pkg.scripts.test = testingFramework.npmScript;
                
                if (testingFramework.copyFiles) {
                    testingFramework.copyFiles(this);      
                }                
            }
        }
        
        if (this.options.assertionLibrary) {
            
            let assertionLibrary = assertionLibraries.find(x => x.value == this.options.assertionLibrary);
            
            pkg.devDependencies[assertionLibrary.value] = assertionLibrary.version;
        }
        
        let devStartCMD;
                
        if (this.options.autoRestartOnChange) {

            devStartCMD = 'nodemon --ignore public/ --ignore test/ --ignore views/ ./boot.js',
            
            pkg.devDependencies[autoRestartOnChangeDependency.value] = autoRestartOnChangeDependency.version;
            
        } else {
            
            devStartCMD = 'node boot.js'; 
        }
        
        let setEnv;
        
        if (os.platform() == 'win32') {
            setEnv = 'SET ';
        } else {
            setEnv = '';
        }        
        
        pkg.scripts['development'] = devStartCMD; 
        pkg.scripts['production'] = `${setEnv}NODE_ENV=production node boot.js`;        
        
        this.log('\r\n');

        this.write('package.json', JSON.stringify(pkg, null, '\t'));   

        this.fs.copy(
            this.templatePath('boot.js'),
            this.destinationPath('boot.js')
        );

        this.fs.copyTpl(
            this.templatePath('app.js'),
            this.destinationPath('app.js'),
            this.options
        );

        this.fs.copy(
            this.templatePath('.babelrc'),
            this.destinationPath('.babelrc')
        );
        
        fs.mkdirSync(this.destinationPath('config'));
        
        this.fs.copyTpl(
            this.templatePath('config/default.js'),
            this.destinationPath('config/default.js'),
            this.options
        );
        
        this.fs.copyTpl(
            this.templatePath('config/production.js'),
            this.destinationPath('config/production.js'),
            this.options
        );

        this.directory('services');  

        if (this.options.logger && this.options.logger.value) {

            const loggerFile = this.options.logger.value + '.js';

            this.fs.copyTpl(
                this.templatePath('loggers/' + loggerFile),
                this.destinationPath('services/logger.js'),
                this.options
            );
        }      

        fs.mkdirSync(this.destinationPath('controllers'));
        
        this.fs.copyTpl(
            this.templatePath('controllers/home.js'),
            this.destinationPath('controllers/home.js'),
            this.options
        );

        if (this.options.appType == 'website') {
            this.directory('public');
        }
        
        if (this.options.viewEngine) {
            fs.mkdirSync(this.destinationPath('views'));
            this.directory(`views/${this.options.viewEngine.value}/Home`, 'views/Home');
        }
    },
    
    install: function() {

        if (!this.skipDependencyInstall) {
            this.log(`\r\nRunning ${chalk.yellow.bold('npm install')} to install dependencies. If it fails please try running it yourself.\r\n`);
            this.npmInstall();   
        }
    }
    
});

function markoRenderFunction() {

    const marko = require('marko');
    
    return function (filePath, options, callback) {

        var template = marko.load(filePath, {writeToDisk: true});
        
        return template.render(options, callback);
    }
}

