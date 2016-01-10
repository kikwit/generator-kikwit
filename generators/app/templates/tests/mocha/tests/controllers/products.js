import chai from 'chai';

import productsController from '../../controllers/products.js';

const expect = chai.expect;

describe("list", function () {
    it('should call ctx#send with the correct message!', function (done) {

        let ctx = {
            send: (text) => {

                expect(text).to.equal('LIST!');
                
                done();
            }
        };

        let controller = new productsController();

        controller.list(ctx);
    });
});
