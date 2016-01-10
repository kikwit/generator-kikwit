'use strict';

import { route, controller, get, post } from 'kikwit';

@controller
export default class products {

    @get
    list(ctx) {

        setTimeout(() => {
            ctx.send('LIST!');
        }, 1000);
    }

}
