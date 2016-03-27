'use strict';

import { route, controller, get, post } from 'kikwit';

@controller
export default class Products {

    @get
    list(ctx) {

        let model = {
            items:  [
                { id: 1, type: 'Food', name: 'Guacamole', expiry: Date.UTC(2019, 10) },
                { id: 2, type: 'Food', name: 'Pasta', expiry: Date.UTC(2020, 3) }        
            ]
        };       
        <% if (appType == 'api') { %> 
        ctx.sendJSON(model);
        <% } else if (appType == 'website') { %>
            <% if (viewEngine) { %>
        ctx.render(model);
            <% } else { %>
        ctx.send(model);
            <% } %>
<% } -%>
    }
}
