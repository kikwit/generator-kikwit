import { service } from 'kikwit';

import bunyan from 'bunyan';

@service('logger', true)
export class Logger {

    constructor(ctx) {

        const logger= bunyan.createLogger({
            name: '<%= appName %>',
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
