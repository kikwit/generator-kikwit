import { service } from 'kikwit';

import log4js from 'log4js';

@service('logger', true)
export class Logger {

    constructor(config) {

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
