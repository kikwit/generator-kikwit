'use strict';
<% if (viewEngine && viewEngine.consolidateKey) { %>
import consolidate from 'consolidate';
<% } -%>
<% if (logger) { -%>
import <%= logger.value %> from '<%= logger.value %>';
<% } -%>

export default () => ({
    
    cluster: false,
    <% if (logger) { -%>
logger: getLogger(),
<% } %>
    route: {
        overview: true  
    },
    server: {
        port: 3000
    },
    <% if (viewEngine) { -%>
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
    }
    <% } %>
});

<% if (viewEngine && viewEngine.renderFunction) { -%>
<%- viewEngine.renderFunction.toString() %>
<% } -%>

<% if (logger) { -%>
function getLogger() {
    <% if (logger.value == 'bunyan') { %>
    var logger= bunyan.createLogger({
        name: '<%= appName %>',
        streams: [
            {
                stream: process.stdout,
                level: 'debug'
            }
        ]
    });
    <% } else if (logger.value == 'log4js') { -%>  
    log4js.configure({
        appenders: [
            { type: 'console' }
        ]
    });
    
    var logger = log4js.getLogger('<%= appName %>'); 
    <% } else if (logger.value == 'winston') { -%>       
    var logger = new (winston.Logger)({
        transports: [
            new (winston.transports.Console)()
        ]
    });        
    <% } %>             
    return logger;
}
<% } -%>
