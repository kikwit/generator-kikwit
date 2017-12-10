import { service } from 'kikwit';

import log4js from 'log4js';

@service('logger', true) // makes the Logger class 'injectable' into controllers and other services using @inject('logger')
export class Logger {

    constructor() {

        const logger = log4js.getLogger('<%= appName %>'); 

        logger.level = 'debug';

        Object.assign(this, logger);
        Object.setPrototypeOf(this, logger);
    }
}
