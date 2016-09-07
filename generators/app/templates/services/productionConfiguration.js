'use strict';

import { service } from 'kikwit';

@service('productionConfiguration')
export class ProductionConfiguration {

    get configuration() {
    
        return {
            
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
    }
}
