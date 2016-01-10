import productsController from '../../controllers/products.js';

describe("list", function () {
    it('should call ctx#send with the correct message!', function (done) {

        let ctx = {
            send: (text) => {

                expect(text).toBe('LIST!');
                
                done();
            }
        };

        let controller = new productsController();

        controller.list(ctx);
    });
});
