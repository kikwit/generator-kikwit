import { service } from 'kikwit';

import winston from 'winston';

@service('logger', true)
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
