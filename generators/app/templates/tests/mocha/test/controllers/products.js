import chai from 'chai';

const expect = chai.expect;

describe("Tests", function () {
    it('Some test', function (done) {

        const actual = true;
        
        expect(actual).to.equal(true);
        
        done();
    });
});
