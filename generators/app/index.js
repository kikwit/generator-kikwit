'use strict';

var fs = require('fs');
var os = require('os');
var path = require('path');

var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

const consolidateVersion = '^0.14.1';

const viewEngines = [
    { name: 'DustJS-LinkedIn', value: 'dustjs-linkedin', extension: 'dust', consolidateKey: 'dust', version: '^2.7.3' },
    { name: 'EJS', value: 'ejs', extension: 'ejs', consolidateKey: 'ejs', version: '^2.5.1' },
    { name: 'Handlebars', value: 'handlebars', extension: 'hbs', consolidateKey: 'handlebars', version: '^4.0.5' },
    { name: 'Pug', value: 'pug', extension: 'pug', consolidateKey: 'pug', version: '^2.0.0-beta6' },
    { name: 'Marko', value: 'marko', extension: 'marko', devWatch: true, renderFunction: markoRenderFunction, version: '^3.10.0'},
    { name: 'Mustache', value: 'mustache', extension: 'mustache', consolidateKey: 'mustache', version: '^2.2.1'},
    { name: 'Nunjucks', value: 'nunjucks', extension: 'html', consolidateKey: 'nunjucks', version: '^2.4.2' },
    { name: 'Vash', value: 'vash', extension: 'vash', consolidateKey: 'vash', version: '^0.12.1' },
    { name: 'None of the above', value: null }
];

const loggers = [
    { name: 'Bunyan', value: 'bunyan', logFunction: 'getBunyanLogFunction', version: '^1.8.1' },
    { name: 'Log4JS', value: 'log4js', logFunction: 'getLog4JSLogFunction', version: '^0.6.38' },
    { name: 'Winston', value: 'winston', logFunction: 'getWinstonLogFunction', version: '^2.2.0' },
    { name: 'None of the above', value: null }
];

const testingFrameworks = [
    { name: 'Buster.js', value: 'buster', version:'^0.7.18', npmScript: 'buster-test --config tests/buster.js', copyFiles: (gen) => {

        gen.fs.copyTpl(
            gen.templatePath('tests/buster/buster.js'),
            gen.destinationPath('tests/buster.js'),
            gen.options
        );
        gen.directory('tests/buster/test', 'tests');
    }},    
    { name: 'Jasmine', value: 'jasmine', version: '^2.5.0', npmScript: 'jasmine JASMINE_CONFIG_PATH=tests/support/jasmine.json', copyFiles: (gen) => {
        gen.directory('tests/jasmin/test', 'tests');
    }},
    { name: 'Mocha', value: 'mocha', version: '^3.0.2', npmScript: 'mocha --compilers js:babel-core/register tests/**/*.js', copyFiles: (gen) => {
        gen.directory('tests/mocha/test', 'tests');
    }},
    { name: 'Tape', value: 'tape', version: '^4.6.0', npmScript: 'tape -r babel-core/register tests/**/*.js', copyFiles: (gen) => {
        gen.directory('tests/tape/test', 'tests');
    }},    
    { name: 'None of the above' }
];

const assertionLibraries = [
    { name: 'Chai', value: 'chai', version: '^3.5.0' },
    { name: 'Should.js', value: 'should', version: '^11.1.0' },
    { name: 'None of the above', value: null }
];

const dependencies = {
    'babel-core': '^6.14.0',
    'babel-plugin-transform-decorators-legacy': '^1.3.4',
    'babel-plugin-transform-es2015-modules-commonjs': '^6.14.0',
    'kikwit': '^3.3.0'
};

const autoRestartOnChangeDependency = {
    value: 'nodemon', version: '^1.10.2'   
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
                message: 'What type of application are you creating?',
                choices: [
                    { name: "Website", value: 'website' },
                    { name: 'Web API', value: 'api' }
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
            config: {
                applicationId: (Math.random() + 1).toString(36).substring(2, 16)
            },
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

            if (this.options.viewEngine) {
                if (this.options.viewEngine.devWatch) {
                    devStartCMD = `nodemon --ext js,${this.options.viewEngine.extension} --ignore public/ --ignore tests/ --ignore views/**/*.js ./boot.js`;
                } else {
                    devStartCMD = 'nodemon --ignore public/ --ignore tests/ --ignore views/ ./boot.js';
                }
            } else {
                devStartCMD = 'nodemon --ignore public/ --ignore tests/ ./boot.js';
            }

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

        fs.mkdirSync(this.destinationPath('services'));

        this.fs.copyTpl(
            this.templatePath('services/adder.js'),
            this.destinationPath('services/adder.js'),
            this.options
        );

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
            this.log(`\r\nRunning ${chalk.yellow.bold('npm install')} to install dependencies. If this fails, try running the command yourself.\r\n`);
            this.npmInstall();   
        }
    }
    
});

function markoRenderFunction() {

    const marko = require('marko');
    
    return function (filePath, options, callback) {

        var template = marko.load(filePath, { writeToDisk: true });
        
        return template.render(options, callback);
    }
}

