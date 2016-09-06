'use strict';

import { service } from 'kikwit';
<% if (viewEngine && viewEngine.consolidateKey) { -%>
import consolidate from 'consolidate';
<% } -%>

@service('defaultConfiguration')
export class DefaultConfiguration {

    get configuration() {
    
        return {
            
            cluster: false,
            route: {
                overview: true  
            },
            server: {
                port: 3000
            }<% if (viewEngine) { -%>,
            views: {
                cache: false,
                defaultEngine: '<%= viewEngine.extension %>',
                engines: {
                    <%= viewEngine.extension %>: <% if (viewEngine.consolidateKey) { -%>
consolidate['<%= viewEngine.consolidateKey %>']
            <% } else if (viewEngine.renderFunction) { -%>
        <%= viewEngine.renderFunction.name %>()
            <% } -%>
    }
            }<% } %>
        }
    }
}

<% if (viewEngine && viewEngine.renderFunction) { -%>
<%- viewEngine.renderFunction.toString() %>
<% } -%>
