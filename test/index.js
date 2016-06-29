var should = require('should');
var muk = require('muk');
var BAOFOO = require('../lib/index');
var pri_key_str = 'MIICeQIBADANBgkqhkiG9w0BAQEFAASCAmMwggJfAgEAAoGBANtfPOlYw8MfOdSPPCJGaQOc2zjUniPxSWZfpxvdrkjbrQ4UsvItXxOkplaTVXebKeXOWgN2mWW18druPwP3+ADq43NVHkfM3IRoT8PagoXgeHTdw2cyjQY9zVygt+2lriTVePAvCAj7c6n3Ojj7k9YY8K2jFP904OG7BSYC9i5BAgMBAAECgYEAmoV8L1XiFsghAROfpPj5sZzEYkSJ3AFy1VSdLii5QgLS5C86WRISfZClxifjtOsr2P7AMt5QcO93G+JjqtT478apAbQvDFyyge3khXl+GApHdaLHmQK4hlQu8XkywX4LmIomZBVm2YBQ55pTHLfnR9y4z7ECTmQIPeGM8mgSSY0CQQDuJ8DMLrtr7Dc1UcLOSss+qs+58xbAx2G7zEgEvqUizMQn/vur3aG17ek8GiL5xk/9o7fI2oR4ZevBHt4EG4CnAkEA688wJBRzeZV6dE+ZeohR3mFbdc27LZ0y0d1Kk/QfPgPZ57dgZDSCCgLAGPU5Wrna4yMORrBLNCpXAhMcoQwO1wJBAJuV7ve1xA3CmWLFEm5xIIzFTMYfkIrK9weYcqhe4EV23uN+Sm7CcUYIsqnoLVdefp2mmoemcoqxky5sewDV8tsCQQDDdN7gaRs2IlJ36iq7SBckDuqygK6vpmcjURup+2WSD7skt/jr1iIbjiAQD+NUck0ejEYfDa2oNZgdHh5S1x3NAkEAp+AbdOrEyV09bgQ4AXOhNS0K9/ijSzvIt3L/40NfaB9w3/AOd1CqT6YkgJ2VGt2Rc7Ih2715vFtmEiuzWRIa2A==';
var pub_key_str = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8fHXEhX3NTfUIDTjl+C5HsjrlLLIMI86DiJv66c8AeMGS9mljzxi7TvGyPGclYwEeHl65/dSGbzF6Az9oFrWFuxQgEnMIA63M97fbp3IW4ib7xnOBWHEGML9CGXHIYDs6JKIn8mHt5UpiMq59inb6uhumYcIe2Kiv6KSXuutGcwIDAQAB';
var baofoo;
var acc_no = '6222020111122220000';
var bind_id = '201604271949318660';
var mobile = '13800000000';
var name = '张宝';
var id_card = '320301198502169142';
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
            member_id: '100000276',
            terminal_id: '100000990',
            rquest_url: 'http://vgw.baofoo.com/cutpayment/api/backTransRequest',
            pri_key_str: pri_key_str,
            pub_key_str: pub_key_str
        });
        baofoo.should.have.properties(['bindCard', 'unbindCard', 'queryBindCard', 'doPay', 'sendMessage', 'queryOrder']);
    });
    it('#bindCard()', function(done) {
        baofoo.bindCard({
            trans_serial_no: 'koala-trans_serial_no' + Date.now(),
            trans_id: 'koala-trans_id' + Date.now(),
            acc_no: acc_no,
            id_card: id_card,
            id_holder: name,
            mobile: mobile,
            pay_code: 'ICBC',
            additional_info: '测试',
            req_reserved: '保留字段',
            sms_code: '123456'
        }, function(err, data) {
            data.should.have.properties({
                'resp_code': '0000'
            });
            should.exists(data.bind_id);
            done(err);
        });
    });
    it('#bindCard() without pay_code', function(done) {
        baofoo.bindCard({
            trans_serial_no: 'koala-trans_serial_no' + Date.now(),
            trans_id: 'koala-trans_id' + Date.now(),
            acc_no: acc_no,
            id_card: id_card,
            id_holder: name,
            mobile: mobile,
            additional_info: '测试',
            req_reserved: '保留字段',
            sms_code: '123456'
        }, function(err, data) {
            data.should.have.properties({
                'resp_code': '0000'
            });
            should.exists(data.bind_id);
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
            data.should.have.properties({
                'resp_code': '0000'
            });
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
            acc_no: acc_no
        }, function(err, data) {
            data.should.have.properties({
                'resp_code': '0000'
            });
            data.bind_id.should.be.equal('201603261412121000009649074');
            done(err);
        });
    });
    it('#queryBindCard() without trans_serial_no', function(done) {
        baofoo.queryBindCard({
            trans_id: 'koala-trans_id' + Date.now(),
            acc_no: acc_no
        }, function(err, data) {
            data.should.have.properties({
                'resp_code': '0000'
            });
            data.bind_id.should.be.equal('201603261412121000009649074');
            done(err);
        });
    });
    it('#queryBindCard() without trans_serial_no and trans_id', function(done) {
        baofoo.queryBindCard({
            acc_no: acc_no
        }, function(err, data) {
            data.should.have.properties({
                'resp_code': '0000'
            });
            data.bind_id.should.be.equal('201603261412121000009649074');
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
            bind_id: bind_id,
            txn_amt: 1,
            sms_code: '1234'
        }, function(err, data) {
            data.should.have.properties({
                'resp_code': '0000'
            });
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
            bind_id: bind_id,
            txn_amt: 1,
            mobile: mobile,
            acc_no: acc_no,
            next_txn_sub_type: '04'
        }, function(err, data) {
            data.should.have.properties({
                'resp_code': '0000'
            });
            done(err);
        });
    });
    it('#sendMessage()', function(done) {
        baofoo.sendMessage({
            bind_id: bind_id,
            txn_amt: 1,
            next_txn_sub_type: '04'
        }, function(err, data) {
            data.should.have.properties({
                'resp_code': '0000'
            });
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
            orig_trans_id: 'koala-trans_id1467101538747'
        }, function(err, data) {
            data.should.have.properties({
                'resp_code': '0000'
            });
            done(err);
        });
    });
    it('#queryOrder() not ok', function(done) {
        baofoo.queryOrder('not ok', function(err, data) {
            err.should.be.equal('first param is not a object or the second param is not a function');
            done(null);
        });
    });
    it('#success()', function(done) {
        baofoo.success('', function(err) {
            should.exists(err);
            done();
        })
    });
    it('#success()', function(done) {
        var mockSuccessPayData = {
            additional_info: '',
            biz_type: '0000',
            data_type: 'json',
            member_id: '100000276',
            req_reserved: '',
            resp_code: '0000',
            resp_msg: '交易成功',
            succ_amt: '1',
            terminal_id: '100000990',
            trade_date: '20160628200626',
            trans_id: 'koala-trans_id1467118334261',
            trans_no: '201606280110000400749871',
            trans_serial_no: 'koala-trans_serial_no1467118334261',
            txn_sub_type: '04',
            txn_type: '0431',
            version: '4.0.0.0'
        };
        baofoo.success(mockSuccessPayData, function(err, data) {
            data.code.should.be.equal(0);
            done(err);
        })
    });
    it('#getBind_Id()', function(done) {
        baofoo.getBind_Id('1223', function(err) {
            should.exists(err);
            done();
        })
    });
    it('#getBind_Id()', function(done) {
        baofoo.getBind_Id({
            acc_no: '6227003320240037533',
            id_card: id_card,
            id_holder: name,
            mobile: mobile,
            sms_code: '123456'
        }, function(err, bind_id) {
            should.exists(bind_id);
            done();
        })
    });
    it('#getBind_Id() with bind_id', function(done) {
        baofoo.getBind_Id({
            bind_id: 'abc123456'
        }, function(err, bind_id) {
            bind_id.should.be.equal('abc123456');
            done(err);
        })
    });
    it('#sendPayMessage() not ok', function(done) {
        baofoo.sendPayMessage('1223', function(err) {
            should.exists(err);
            done();
        })
    });
    describe('sendPayMessage muk getBind_Id()', function() {
        before(function() {
            muk(baofoo, 'getBind_Id', function(data, cb) {
                process.nextTick(function() {
                    cb(null, bind_id);
                });
            });
        });
        it('#sendPayMessage()', function(done) {
            baofoo.sendPayMessage({
                acc_no: '6227003320240037533',
                id_card: id_card,
                id_holder: name,
                mobile: mobile,
                txn_amt: 100
            }, function(err, data) {
                data.should.have.properties({
                    'resp_code': '0000'
                });
                done(err);
            })
        });
        after(function() {
            muk.restore();
        });
    });
    it('#bindCardAndPay() not ok', function(done) {
        baofoo.bindCardAndPay('1223', function(err) {
            should.exists(err);
            done();
        })
    });
    describe('bindCardAndPay muk getBind_Id()', function() {
        before(function() {
            muk(baofoo, 'getBind_Id', function(data, cb) {
                process.nextTick(function() {
                    cb(null, bind_id);
                });
            });
        });
        it('#bindCardAndPay()', function(done) {
            baofoo.bindCardAndPay({
                acc_no: '6227003320240037533',
                id_card: id_card,
                id_holder: name,
                mobile: mobile,
                sms_code: '123456',
                txn_amt: 100,
                trans_id: 'pay-trans_id-' + Date.now()
            }, function(err, data) {
                data.should.have.properties({
                    'resp_code': '0000'
                });
                data.trans_id.should.containEql('pay-trans_id-');
                done(err);
            })
        });
        after(function() {
            muk.restore();
        });
    });
});