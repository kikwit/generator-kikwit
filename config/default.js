import consolidate from 'consolidate';

export default {
            
    cluster: false,
    route: {
        overview: true  
    },
    http: {
        port: 3000
    },
    views: {
        cache: false,
        defaultEngine: 'pug',
        engines: {
            pug: consolidate['pug']
        }
    }
}

