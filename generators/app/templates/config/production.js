'use strict';

export default () => ({

    logger: (severity, ...args) => { 
        // TODO use winston, bunyan, log4js, etc...
    },
    server: {
        port: 80 
    },
    <% if (viewEngine) { -%>
views: {
        cache: true
    }
    <% } %>
});

