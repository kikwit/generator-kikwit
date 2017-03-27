import { service } from 'kikwit';

import bunyan from 'bunyan';

@service('logger', true) // makes the Logger class 'injectable' into controllers and other services using @inject('logger')
export class Logger {

    constructor() {

        const logger= bunyan.createLogger({
            name: 'generator kikwit',
            streams: [
                {
                    stream: process.stdout,
                    level: 'debug'
                }
            ]
        });

        Object.assign(this, logger);
        Object.setPrototypeOf(this, logger);
    }
}
