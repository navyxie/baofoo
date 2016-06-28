var should = require('should');
var util = require('../lib/util');
describe('util', function() {
    it('#getRSAPrivateKey()', function() {
        var expectStr = '-----BEGIN PRIVATE KEY-----\r\nMIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAPI7Hb+2X0/1r4+x\r\nJXBoFRgFSN9G4xSSvlfKFd6ynYpHklLLfNG6z21bw+DDWvrkNpcbAjAzfgMZAXmB\r\nJKQRTMQM9RBxu2978ot1KJJBfk1Njw1lWrYC\r\n-----END PRIVATE KEY-----';
        expectStr.should.be.equal(util.getRSAPrivateKey('MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAPI7Hb+2X0/1r4+xJXBoFRgFSN9G4xSSvlfKFd6ynYpHklLLfNG6z21bw+DDWvrkNpcbAjAzfgMZAXmBJKQRTMQM9RBxu2978ot1KJJBfk1Njw1lWrYC'));
    });
    it('#getRSAPublicKey()', function() {
        var expectStr = '-----BEGIN PRIVATE KEY-----\r\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCpBL+SzNNpeJVAhP8XO91dPrQH\r\nf6w2k7aqwnWGjnYjRlmy7iaeUJT/wb3PoH+ioGNTJy\r\n-----END PRIVATE KEY-----';
        expectStr.should.be.equal(util.getRSAPrivateKey('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCpBL+SzNNpeJVAhP8XO91dPrQHf6w2k7aqwnWGjnYjRlmy7iaeUJT/wb3PoH+ioGNTJy'));
    });
    it('#hex2bin()', function() {
        should.exists(util.hex2bin('9a24c406429fc5b74ce53fff2553deb7c765b49ac9654a53c04588770edc617f5cb19c3c1c4ca'));
    });
    it('#generateSerialNo()', function() {
        util.generateSerialNo().should.containEql('TSN');
    });
    it('#generateTransId()', function() {
        util.generateTransId().should.containEql('TI');
    });
    it('#isSuccess()', function() {
        util.isSuccess().should.be.false;
    });
    it('#isSuccess()', function() {
        util.isSuccess({resp_code:'0000'}).should.be.true;
    });
});