import { service } from 'kikwit';

import winston from 'winston';

@service('logger', true) // makes the Logger class 'injectable' into controllers and other services using @inject('logger')
export class Logger {

    constructor() {

        const logger = new (winston.Logger)({
            transports: [
                new (winston.transports.Console)({ 'timestamp':true })
            ]
        });  

        Object.assign(this, logger);
        Object.setPrototypeOf(this, logger);
    }
}
