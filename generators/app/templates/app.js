'use strict';
<% if (viewEngine && viewEngine.consolidateKey) { %>
import consolidate from 'consolidate';
<% } -%>
import { httpServer } from 'kikwit';
<% if (viewEngine) { %>
const settings = {
  views: {
    defaultEngine: '<%= viewEngine.extension %>',
    engines: {
      <%= viewEngine.extension %>: <% if (viewEngine.consolidateKey) { -%>
consolidate['<%= viewEngine.consolidateKey %>']
<% } else if (viewEngine.renderFunction) { -%>
<%= viewEngine.renderFunction.name %>()
<% } -%>
    }
  }
}
<% } %>
httpServer.start(null, settings); 

<% if (viewEngine.renderFunction) { -%>
<%- viewEngine.renderFunction.toString() %>
<% } -%>