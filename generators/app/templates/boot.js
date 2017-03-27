'use strict';

global.KIKWIT_APPLICATION_ROOT = __dirname;

require('babel-core/register')({
  ignore: /node_modules\/(?!kikwit\/)/  
});
<% if (viewEngine && viewEngine.bootOptions) { -%>
  <% for (var i = 0; i < viewEngine.bootOptions.length; i++) { %>
<%- viewEngine.bootOptions[i] %>
  <% } -%>
<% } -%>

require('./app');
