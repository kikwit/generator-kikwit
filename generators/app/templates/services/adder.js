import { service, inject } from 'kikwit';

@inject('logger') /* injects the Logger service (Logger class from services/ folder) */ 
@service('adder') /* makes the Adder class 'injectable' using @inject('adder') */
export class Adder {

    add(a, b) {
    
        this.services.logger.info('Services can be injected in other services');

        return a + b;
    }
}
