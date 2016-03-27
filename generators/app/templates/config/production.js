'use strict';

export default () => ({

    server: {
        port: 80 
    },
    <% if (viewEngine) { -%>
views: {
        cache: true
    }
    <% } %>
});

