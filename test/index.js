var should = require('should');
var BAOFOO = require('../lib/index');
describe('BAOFOO', function() {
    it('instance not ok', function() {
        try {
            new BAOFOO();
        } catch (e) {
            e.should.be.equal('param config is not a object.');
        }
    });
})