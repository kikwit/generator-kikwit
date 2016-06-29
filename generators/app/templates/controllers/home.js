'use strict';

import { controller, get, inject } from 'kikwit';

<% if (logger) { %>@inject('logger') /* injects the Logger service (Logger class from services/ folder) */ <% } -%>    
@controller
export default class Home {

    @inject('adder') /* injects the Adder service (Adder class from services/ folder) */
    @get
    index(ctx) {

        const [a, b] = [2, 3];

        const adder = ctx.services.adder; /* adder provided by @inject('adder') */
        const sum = adder.add(a, b); 
<% if (logger) { %>
        ctx.services.logger.info(`${a} + ${b} = ${sum}`); /* logger provided by @inject('logger') */
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
