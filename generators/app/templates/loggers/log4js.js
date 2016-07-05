import { service } from 'kikwit';

import log4js from 'log4js';

@service('logger', true) // makes the Logger class 'injectable' into controllers and other services using @inject('logger')
export class Logger {

    constructor() {

        log4js.configure({
            appenders: [
                { type: 'console' }
            ]
        });
        
        const logger = log4js.getLogger('<%= appName %>'); 

        Object.assign(this, logger);
        Object.setPrototypeOf(this, logger);
    }
}
