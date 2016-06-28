var should = require('should');
var BAOFOO = require('../lib/index');
var pri_key_str = 'MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAPI7Hb+2X0/1r4+xJXBoFRgFSN9G4xSSvlfKFd6ynYpHklLLfNG6z21bw+DDWvrkNpcbAjAzfgMZAXmBJKQRTMQM9RBxu2978ot1KJJBfk1Njw1lWrYCZiQ1uaNhXykHrBHYiBxDE/uVSAEmQ9IJyxB++khsNe7WWT2re2JW+OzfAgMBAAECgYEAz5OLRbth6CKRJODYRYBb+y6kKPoVJI8v4AlEPofv6wy0PpE0UIH2uS83J0ghkfi5Mzoo4OdvZ/Yoxle9738HuRrDVYzDgsr2mGmr11ESVhe7jmdrPryURai0qedjpSVgfY9QrQsgOilPR+GYkkOh0szhwkm4KHIKx8bdxpHvHCECQQD+IGFGNHov+3/HQJmcuqLRUizEbsi4mkKhiqcInQ482o+7uoysVYjszIkAlpDXVlxMqPEeVn0p9rVChJxiBMlxAkEA9ARJECnNP+y6eePT6ueii10p1wajUjcxL30bqYLPVWuhSICmttCoNiApIj4HFQSQBxDZXoSODEuo9m3TWJFzTwJBAN7wXSYP55msk36jx59dhHUKGEgDwIdinU3Gq5682b69JxdUIxEUwNis3wvrCwo+sx51n4Iz8f4cdwvx9pdvB6ECQQDd9Lfwt9U2fEHydUVhumijk45nRGZydjmLFKWAvreQ32HI7Ry31XvsH7zKpNkUSR4pDy5pRvFeRcPew28mdMcJAkAPW9D4FCgJAfH1v1be8YkP44sJ4nRlcm03hOx8/Ebp/Xx+lqHNsf0RIg+vO9PuD7vEm3ZAz5UXe4TamX6HwMxH';
var pub_key_str = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCpBL+SzNNpeJVAhP8XO91dPrQHf6w2k7aqwnWGjnYjRlmy7iaeUJT/wb3PoH+ioGNTJyPHvfYHalEmvi133K3N8NdHizaYTjm1hgNBhBIK8aPZCR76C3UtQPv4mqA5fTZEWnRbr8JrVJoFNEN2+4JQwCeDtaC3OzPPflETt6zdOQIDAQAB';
var baofoo;
describe('BAOFOO', function() {
    this.timeout(50000);
    it('instance not ok', function() {
        try {
            new BAOFOO();
        } catch (e) {
            e.should.be.equal('param config is not a object.');
        }
    });
    it('instance ok', function() {
        baofoo = new BAOFOO({
            member_id: '100000178',
            terminal_id: '100000859',
            rquest_url: 'https://tgw.baofoo.com/cutpayment/api/backTransRequest',
            pri_key_str: pri_key_str,
            pub_key_str: pub_key_str
        });
        baofoo.should.have.properties(['bindCard', 'unbindCard', 'queryBindCard', 'doPay', 'sendMessage', 'queryOrder']);
    });
    it('#bindCard()', function(done) {
        baofoo.bindCard({
            trans_serial_no: 'koala-trans_serial_no' + Date.now(),
            trans_id: 'koala-trans_id' + Date.now(),
            acc_no: '6227003320240000000',
            id_card: '440882198105421458',
            id_holder: '李四',
            mobile: '13800000000',
            pay_code: 'CCB',
            additional_info: '测试',
            req_reserved: '保留字段'
        }, function(err, data) {
            data.should.have.properties(['code'])
            done(err);
        });
    });
    it('#bindCard() not ok', function(done) {
        baofoo.bindCard('not ok', function(err, data) {
            err.should.be.equal('first param is not a object or the second param is not a function');
            done(null);
        });
    });
    it('#unbindCard()', function(done) {
        baofoo.unbindCard({
            trans_serial_no: 'koala-trans_serial_no' + Date.now(),
            trans_id: 'koala-trans_id' + Date.now(),
            bind_id: 'test-bind_id'
        }, function(err, data) {
            data.should.have.properties(['code'])
            done(err);
        });
    });
    it('#unbindCard() not ok', function(done) {
        baofoo.unbindCard('not ok', function(err, data) {
            err.should.be.equal('first param is not a object or the second param is not a function');
            done(null);
        });
    });
    it('#queryBindCard()', function(done) {
        baofoo.queryBindCard({
            trans_serial_no: 'koala-trans_serial_no' + Date.now(),
            trans_id: 'koala-trans_id' + Date.now(),
            acc_no: '6227003320240000000'
        }, function(err, data) {
            data.should.have.properties(['code'])
            done(err);
        });
    });
    it('#queryBindCard() not ok', function(done) {
        baofoo.queryBindCard('not ok', function(err, data) {
            err.should.be.equal('first param is not a object or the second param is not a function');
            done(null);
        });
    });
    it('#doPay()', function(done) {
        baofoo.doPay({
            trans_serial_no: 'koala-trans_serial_no' + Date.now(),
            trans_id: 'koala-trans_id' + Date.now(),
            bind_id: 'test-bind_id',
            txn_amt: 1,
            sms_code: '1234'
        }, function(err, data) {
            data.should.have.properties(['code'])
            done(err);
        });
    });
    it('#doPay() not ok', function(done) {
        baofoo.doPay('not ok', function(err, data) {
            err.should.be.equal('first param is not a object or the second param is not a function');
            done(null);
        });
    });
    it('#sendMessage()', function(done) {
        baofoo.sendMessage({
            trans_serial_no: 'koala-trans_serial_no' + Date.now(),
            trans_id: 'koala-trans_id' + Date.now(),
            bind_id: 'test-bind_id',
            txn_amt: 1,
            mobile: '13800000000',
            acc_no: '6227003320240000000',
            next_txn_sub_type: '04'
        }, function(err, data) {
            data.should.have.properties(['code'])
            done(err);
        });
    });
    it('#sendMessage() not ok', function(done) {
        baofoo.sendMessage('not ok', function(err, data) {
            err.should.be.equal('first param is not a object or the second param is not a function');
            done(null);
        });
    });
    it('#queryOrder()', function(done) {
        baofoo.queryOrder({
            trans_serial_no: 'koala-trans_serial_no' + Date.now(),
            trans_id: 'koala-trans_id' + Date.now(),
            orig_trans_id: 'asdsatrwtg4fdg43'
        }, function(err, data) {
            data.should.have.properties(['code'])
            done(err);
        });
    });
    it('#queryOrder() not ok', function(done) {
        baofoo.queryOrder('not ok', function(err, data) {
            err.should.be.equal('first param is not a object or the second param is not a function');
            done(null);
        });
    });
})