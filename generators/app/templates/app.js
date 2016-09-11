'use strict';

import { Server } from 'kikwit';
 
const server = new Server();

server.configure(config => {

    config.addService('defaultConfiguration')
    config.addService(`${config.environment}Configuration`, true);
 
    if (config.isEnvironment('development')) {
        config.addUserConfig();
    }
    
    config.addEnvironmentVariables();  
});

server.start().then(() => {
    console.log(`Online, PID: ${process.pid}`);
});
