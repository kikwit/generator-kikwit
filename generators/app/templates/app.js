'use strict';
<% if (viewEngine) { %>
import consolidate from 'consolidate';
<% } -%>
import { httpServer } from 'kikwit';
<% if (viewEngine) { %>
const settings = {
  views: {
    defaultEngine: '<%= viewEngine.extension %>',
    engines: {
      <%= viewEngine.extension %>: consolidate['<%= viewEngine.consolidateKey %>']
    }
  }
}
<% } %>
httpServer.start(null, settings); 

