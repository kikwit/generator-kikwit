'use strict';

<% if (viewEngine) { %>
import consolidate from 'consolidate';
<% } %>

import { httpServer } from 'kikwit';

<% if (viewEngine) { %>
const settings = {
  views: {
    defaultEngine: '<%= viewEngine.extension %>',
    engines: {
      <%= viewEngine.extension %>: consolidate.<%= viewEngine.value %>
    }
  }
}
<% } %>
httpServer.start(null, settings); 

