import consolidate from 'consolidate';

export default {
            
    cluster: true,
    route: {
        overview: false  
    },
    server: {
        port: 80
    }<% if (viewEngine) { -%>,
    views: {
        cache: true
    }<% } %>
}