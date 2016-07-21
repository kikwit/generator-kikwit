import { service, inject } from 'kikwit';

<% if (logger) { %>@inject('logger') /* injects the Logger service (Logger class from services/ folder) */ <% } -%>  
@service('adder') /* makes the Adder class 'injectable' into controllers and other services using @inject('adder') */
export class Adder {

    add(a, b) {
<% if (logger) { %>    
        this.services.logger.info('Services can be injected in other services'); // logger provided by @inject('logger')
<% } -%>     
        return a + b;
    }
}
