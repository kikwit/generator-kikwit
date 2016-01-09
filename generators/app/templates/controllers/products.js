'use strict';

import { route, controller, get, post } from 'kikwit';

@controller
export default class products {

	@get
	list(ctx) {
	
		setTimeout(() => {
           
			let routeURL = ctx.routeURL('remLink', {item: '987654', id: 746 }, { works: true, gotIt: 'yes'});
			console.log('routeURL', routeURL);
			ctx.send('LIST!');
		}, 0);	
	}
	
	@route('/`code \\w{6}`')
	@get
	details(ctx) {
		
	}
	
	@post
	edit(ctx) {
		
	}
}
