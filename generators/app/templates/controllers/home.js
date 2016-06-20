'use strict';

import { controller, get, inject } from 'kikwit';

<% if (logger) { %>@inject('logger') /* inject the Logger service (Logger class from services/ folder) */ <% } -%>    
@controller
export default class Home {

    @inject('adder') /* inject the Adder service (Adder class from services/ folder) */
    @get
    index(ctx) {

        const [a, b] = [2, 3];

        const adder = ctx.services.adder; /* provided by @inject('adder') */
        const sum = adder.add(a, b); 
<% if (logger) { %>
        const logger = ctx.services.logger; /* provided by @inject('logger') */
        logger.info(`${a} + ${b} = ${sum}`);
<% } -%>         
<% if (appType == 'api') { -%> 
        const message = { a, b, sum };

        ctx.sendJSON(message);
    }
}
<% } else if (appType == 'website') { -%>
        const message = `${a} + ${b} = ${sum}`;
            <% if (viewEngine) { %>
        ctx.render({ message });
            <% } else { %>
        ctx.send(message);
            <% } %>
    }
}
<% } %>
