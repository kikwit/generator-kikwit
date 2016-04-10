'use strict';
<% if (logger) { %>
import <%= logger.value %> from '<%= logger.value %>';
<% } -%>

export default () => ({

    <% if (logger) { -%>
logger: getLogger(),
<% } -%>
    server: {
        port: 80 
    },
    <% if (viewEngine) { -%>
views: {
        cache: true
    }
    <% } %>
});

<% if (logger) { -%>
function getLogger() {
    <% if (logger.value == 'bunyan') { %>
    var logger= bunyan.createLogger({
        name: '<%= appName %>',
        streams: [
            {
                level: 'info',
                path: 'server.log'
            }
        ]
    });
    <% } else if (logger.value == 'log4js') { -%>  
    log4js.loadAppender('file');
    log4js.configure({
        appenders: [
            {
                type: 'file',
                absolute: false,
                filename: 'server.log',
                maxLogSize: 20480,
                backups: 3        
            }
        ]
    });

    var logger = log4js.getLogger('<%= appName %>'); 
    <% } else if (logger.value == 'winston') { -%>       
    var logger = new (winston.Logger)({
        transports: [
            new (winston.transports.File)({ 
                filename: 'server.log',   
                level: 'info',
                json: true,
                eol: 'rn',
                timestamp: true,
                exitOnError: false
            })
        ]
    });        
    <% } %>             
    return logger;
}
<% } -%>
