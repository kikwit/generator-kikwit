'use strict';

import { controller, get, inject } from 'kikwit';

<% if (logger) { %>@inject('logger') /* injects the Logger service (Logger class from services/ folder) */ <% } -%>    
@controller
export class Home {

    @inject('adder') /* injects the Adder service (Adder class from services/ folder) */
    @get
    index(context) {

        const [a, b] = [2, 3];
        
        const sum = context.services.adder.add(a, b); /* adder provided by @inject('adder') */
<% if (logger) { %>
        context.services.logger.info(`${a} + ${b} = ${sum}`); /* logger provided by @inject('logger') */
<% } -%>         
<% if (appType == 'api') { -%> 
        const message = { a, b, sum };

        context.sendJSON(message);
    }
}
<% } else if (appType == 'website') { -%>
        const message = `${a} + ${b} = ${sum}`;
            <% if (viewEngine) { %>
        context.render({ message });
            <% } else { %>
        context.send(message);
            <% } %>
    }
}
<% } %>
