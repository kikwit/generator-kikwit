'use strict';

import { httpServer } from 'kikwit';

const settings = {
  staticFiles: {
      maxAge: 10
  },
  dependencies: {
      missingD: 2624,
      userService: undefined,
      orderProvider: new Map(),
      allServ: { save() { console.log('dadad'); }}
  },
  views: {
    defaultEngine: 'html',
    engines: {
      html: function(viewPath, locals, cb) {
        console.log(viewPath);
        cb(null, 'VVVVView!')
      }
    }
  }
}

httpServer.start(null, settings); 

