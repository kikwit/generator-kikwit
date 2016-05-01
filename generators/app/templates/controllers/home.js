'use strict';

import { controller, get } from 'kikwit';

@controller
export default class Home {

    @get
    index(ctx) {

        const message = 'Hello';   
        <% if (appType == 'api') { %> 
        ctx.sendJSON(message);
        <% } else if (appType == 'website') { %>
            <% if (viewEngine) { %>
        ctx.render({message});
            <% } else { %>
        ctx.send(message);
            <% } %>
<% } -%>
    }
}
