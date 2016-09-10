'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');

const generators = require('yeoman-generator');

const chalk = require('chalk');
const mkdirp = require('mkdirp');

const allowedCommands = {
    clear: { key: false, value: false, exec: clearValues },
    get: { key: true, value: false, exec: getValue },    
    remove: { key: true, value: false, exec: removeValue },        
    set: { key: true, value: true, exec: setValue },
    show: { key: false, value: false, exec: showConfig }
};

const hierarchySeparator = '.';

module.exports = generators.Base.extend({

    constructor: function () {

        // The following 2 lines are for avoiding the issue described at
        // https://github.com/slara/generator-reveal/issues/65
        Number.prototype.match = String.prototype.match;
        Number.prototype.charAt = String.prototype.charAt;        

        generators.Base.apply(this, arguments);

        this.argument('command', { type: String, required: false });
        this.argument('key', { type: String, required: false });
        this.argument('value', { type: String, required: false });

        this.command = (this.command || 'show').toLowerCase();

        if (this.key) {
            this.key = this.key.toLowerCase();
        }

        if (this.value && /true|false/i.test(this.value)) {
            this.value = this.value.toLowerCase() === 'true';
        }
    },

    validating: function () {

        const constraints = allowedCommands[this.command];

        if (!constraints) {

            this.log(`Invalid command ${chalk.bold(this.command)}`);
            return;
        }

        if (constraints.key && (!this.key || !this.key.trim())) {
          
            this.log('Please specify a configuration key');
            return;
        }

        if (constraints.value && (this.value == null || !String(this.value).trim())) {

            this.log(`Please specify a configuration value`);
            return;
        }

        try {

            constraints.exec(this);

        } catch (err) {

            this.log(`Error: ${ err.message }`);
        }
    }
});

function clearValues(generator) {

    const configFile = getUserConfigFile();

    fs.writeFileSync(configFile.filePath, '{}');

    generator.log(`User config keys cleared.`);
}

function getValue(generator) {

    const configFile = getUserConfigFile();

    let data = configFile.data;

    if (generator.key && generator.key.trim().length) {

        let obj = data;

        const props = generator.key.split(hierarchySeparator);
        const propsCount = props.length;

        for (let [index, prop] of props.entries()) {

            if (index == propsCount - 1) {
                data = obj[prop];
                break;
            } 
            
            if (obj[prop] == null || !(obj[prop] instanceof Object)) {

                data = undefined;
                break;
            }

            obj = obj[prop];
        }
    }

    if (data == undefined) {
        
        generator.log(`Config key ${ chalk.bold(generator.key) } is undefined.`);
        return;
    }

    const fileContent = JSON.stringify(data, null, 2);

    generator.log(`${ chalk.bold(fileContent) }`);
}

function showConfig(generator) {

    const configFile = getUserConfigFile();

    const fileContent = JSON.stringify(configFile.data, null, 2);

    generator.log(`${ chalk.bold(fileContent) }`);
}

function removeValue(generator) {

    const configFile = getUserConfigFile();
    const props = generator.key.split(hierarchySeparator);
    const propsCount = props.length;

    let data = configFile.data;

    let removed;

    for (let [index, prop] of props.entries()) {

        if (index == propsCount - 1) {

            if (data[prop] != null) {
                removed = true;
            }

            data[prop] = undefined;

            break;
        } 
        
        if (data[prop] == null || !(data[prop] instanceof Object)) {
            break;
        }

        data = data[prop];        
    };

    if (removed) {

        const fileContent = JSON.stringify(configFile.data);

        fs.writeFileSync(configFile.filePath, fileContent);

        generator.log(`Successfully removed user key ${ chalk.bold(generator.key) } from user config file.`);

    } else {

        generator.log(`Could not find key ${ chalk.bold(generator.key) } in user config file.`);
    }
}

function setValue(generator) {

    const configFile = getUserConfigFile();
    const props = generator.key.split(hierarchySeparator);
    const propsCount = props.length;

    let data = configFile.data;

    for (let [index, prop] of props.entries()) {

        if (index == propsCount - 1) {

            data[prop] = generator.value;
            break;
        } 
        
        if (data[prop] == null || !(data[prop] instanceof Object)) {

            data[prop] = {};
        }

        data = data[prop];        
    };

    const fileContent = JSON.stringify(configFile.data);

    fs.writeFileSync(configFile.filePath, fileContent);

    generator.log(`Successfully saved user config key ${ chalk.bold(generator.key) } with value ${ chalk.bold(generator.value) }.`);
}

function getUserConfigFile() {

    const packageJSON = getPackageJSON(process.cwd());

    if (!packageJSON) {
        throw new Error(`Command not run in a Kikwit application.`);
    }

    if (!packageJSON.config
        || !packageJSON.config.applicationId
        || !packageJSON.config.applicationId.trim()) {
        throw new Error(`Required ${chalk.bold('applicationId')} config key not specified in package.json file.`);
    }

    const applicationId = packageJSON.config.applicationId.trim();
    const directoryPath = ensureDirectoryExists(applicationId);

    let filePath = path.join(directoryPath, 'user-config.json');
    let fileContent;

    try {

        fileContent = fs.readFileSync(filePath, 'utf-8');

    } catch (err) {

        if (err.code != 'ENOENT') {
            throw err;
        }
    }

    if (!fileContent || !fileContent.trim()) {
        fileContent = '{}';
    }

    const data = JSON.parse(fileContent);

    return { filePath, data };
}

function ensureDirectoryExists(applicationId) {

    let directoryPath;

    if (os.platform() == 'win32') {
        directoryPath = path.join(process.env.APPDATA, 'kikwit');
    } else {
        directoryPath = path.join(process.env.HOME, '.kikwit');
    }

    directoryPath = path.join(directoryPath, 'config', 'development', applicationId);

    mkdirp.sync(directoryPath, '0777');

    return directoryPath;
}

function getPackageJSON(directory) {

    try {

        const filePath = path.join(path.resolve(directory), 'package.json');
        const content = fs.readFileSync(path.join(filePath));

        return JSON.parse(content);
    }
    catch (err) {

        if (err.code != 'ENOENT') {
            throw err;
        }

        directory = path.dirname(directory);

        if (directory != '/') {
            return getPackageJSON(directory);
        }

        return null;
    }
}