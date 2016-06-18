'use strict';

import { controller, get, inject } from 'kikwit';

@controller
export default class Home {

    @inject('adder')
    @get
    index(ctx) {

        const [a, b] = [2, 3];
        const sum = ctx.services.adder.add(a, b); 
        <% if (appType == 'api') { %> 
        const message = { a, b, sum };

        ctx.sendJSON(message);
    }
}
        <% } else if (appType == 'website') { %>
        const message = `${a} + ${b} = ${sum}`;
            <% if (viewEngine) { %>
        ctx.render({ message });
            <% } else { %>
        ctx.send(message);
            <% } %>
    }
}
<% } %>
