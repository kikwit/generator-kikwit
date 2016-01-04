'use strict';

var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = generators.Base.extend({

    constructor: function() {
   
        generators.Base.apply(this, arguments);

        // this._.templateSettings.interpolate = /<%=([\s\S]+?)%>/g;
    },

    prompting: {

        appName: function() {

            let done = this.async();

            let prompt = [
                {
                    type: 'input',
                    name: 'appName',
                    message: 'Enter a name for your app:',
                },
            ];

            this.prompt(prompt, (answers) => {

                this.options.appName = answers.appName;
                done();
            });
        },

        appType: function() {

            let done = this.async();

            let prompt = [
                {
                    type: 'list',
                    name: 'appType',
                    message: 'What sort of app are you creating?',
                    choices: [
                        { name: "Website", value: "website" },
                        { name: "API", value: "api" }
                    ],
                    default: 'website'
                },
            ];

            this.prompt(prompt, (answers) => {

                this.options.appType = answers.appType;
                done();
            });
        }
    },

    writing: function()  {

        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'),
            { 
                appName: this.options.appName
            }
        );

        this.fs.copy(
            this.templatePath('boot.js'),
            this.destinationPath('boot.js')
        );

        this.fs.copy(
            this.templatePath('app.js'),
            this.destinationPath('app.js')
        );

        this.fs.copy(
            this.templatePath('.babelrc'),
            this.destinationPath('.babelrc')
        );

        this.directory('controllers');
        this.directory('tests');

        if (this.options.appType == 'website') {

            this.directory('public');
        }
    },

    install: function() {

        this.installDependencies();
    }

});


