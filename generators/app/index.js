'use strict';
var fs = require('fs');
var path = require('path');

var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

const consolidateVersion = '^0.13.1';

const viewEngines = [
    { name: 'EJS', value: 'ejs', extension: 'ejs', version: '^2.3.4' },
    { name: 'Handlebars', value: 'handlebars', extension: 'hbs', version: '^4.0.5' },
    { name: 'Jade', value: 'jade', extension: 'jade', version: '^1.11.0' },
    { name: 'Mustache', value: 'mustache', extension: 'mustache', version: '^2.2.1'},
    { name: 'Nunjucks', value: 'nunjucks', extension: 'html', version: '^2.3.0' },
    { name: 'None of the above', value: null }
];

const testingFrameworks = [
    { name: 'Jasmine', value: 'jasmine', version: '^2.4.1', npmScript: 'jasmine JASMINE_CONFIG_PATH=tests/support/jasmine.json', copyFiles: (gen) => {
        gen.directory('tests/jasmin/tests', 'tests');
    }},
    { name: 'Mocha', value: 'mocha', version: '^2.3.4', npmScript: 'mocha --compilers js:babel-core/register tests/**/*.js', copyFiles: (gen) => {
        gen.directory('tests/mocha/tests', 'tests');
    }},
    { name: 'Buster.js', value: 'buster', version:'^0.8.0', npmScript: 'buster-test --config tests/buster.js', copyFiles: (gen) => {

        gen.fs.copyTpl(
            gen.templatePath('tests/buster/buster.js'),
            gen.destinationPath('tests/buster.js'),
            gen.options
        );
        gen.directory('tests/buster/tests', 'tests');
    }},
    { name: 'None of the above' }
];

const assertionLibraries = [
    { name: 'Chai', value: 'chai', version: '^3.4.1' },
    { name: 'Should.js', value: 'should', version: '^8.0.2' },
    { name: 'None of the above', value: null }
];

const dependencies = {
    'babel-core': '^6.3.26',
    'babel-plugin-transform-decorators-legacy': '^1.3.4',
    'babel-plugin-transform-es2015-destructuring': '^6.3.15',
    'babel-plugin-transform-es2015-modules-commonjs': '^6.3.16',
    'babel-plugin-transform-es2015-parameters': '^6.3.26',
    'babel-plugin-transform-es2015-sticky-regex': '^6.3.13',
    'babel-plugin-transform-es2015-unicode-regex': '^6.3.13',
    'babel-plugin-transform-strict-mode': '^6.3.13'
};

const autoRestartOnChangeDependency = {
    value: 'nodemon', version: '^1.8.1'   
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
                name: 'appname',
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
                type: 'confirm',
                name: 'addViewEngine',
                message: 'Would you like to add a view engine?',
                default: true,
                when: function (answers) {
                    return answers.appType == 'website';
                }
            },
            {
                type: 'list',
                name: 'viewEngine',
                message: 'Select a view engine',
                choices: viewEngines,
                when: function (answers) {
                    return answers.addViewEngine;
                }
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

        this.prompt(prompts, (answers) => {

            this.options = answers;
            done();
        });
            
    },

    writing: function()  {
        
        var pkg = {
            name: this.options.appname,
            version: '0.0.1',
            main: 'boot.js',
            scripts: {
                start: 'nodemon --ignore public/ --ignore tests/ ./boot.js',
                test: 'echo "Error: no test specified" && exit 1'
            },
            dependencies: dependencies,
            devDependencies: {}
        };
        
        if (this.options.viewEngine) {
            
            let viewEngine = viewEngines.find(x => x.value == this.options.viewEngine);
            
            this.options.viewEngine = viewEngine;
            
            pkg.dependencies[viewEngine.value] = viewEngine.version;
            pkg.dependencies.consolidate = consolidateVersion;
        }
        
        if (this.options.testingFramework) {
            
            let testingFramework = testingFrameworks.find(x => x.value == this.options.testingFramework);
            
            pkg.devDependencies[testingFramework.value] = testingFramework.version;
            pkg.scripts.test = testingFramework.npmScript;
            
            if (testingFramework.copyFiles) {
                testingFramework.copyFiles(this);      
            }
        }
        
        if (this.options.assertionLibrary) {
            
            let assertionLibrary = assertionLibraries.find(x => x.value == this.options.assertionLibrary);
            
            pkg.devDependencies[assertionLibrary.value] = assertionLibrary.version;
        }
        
        if (this.options.autoRestartOnChange) {

            pkg.devDependencies[autoRestartOnChangeDependency.value] = autoRestartOnChangeDependency.version;
        }
        
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

        fs.mkdirSync(this.destinationPath('controllers'));
        
        this.fs.copyTpl(
            this.templatePath('controllers/products.js'),
            this.destinationPath('controllers/products.js'),
            this.options
        );

        if (this.options.appType == 'website') {
            this.directory('public');
        }
        
        if (this.options.viewEngine) {
            fs.mkdirSync(this.destinationPath('views'));
            this.directory(`views/${this.options.viewEngine.value}/Products`, 'views/Products')
        }
    },
    
    install: function() {

        this.log(`\r\nRunning ${chalk.yellow.bold('npm install')} to install dependencies. If it fails please try running it yourself.\r\n`);
        this.npmInstall();
    }
    
});





