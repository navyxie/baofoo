var should = require('should');
var RSA = require('../lib/rsa');
var pri_key_str = 'MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAPI7Hb+2X0/1r4+xJXBoFRgFSN9G4xSSvlfKFd6ynYpHklLLfNG6z21bw+DDWvrkNpcbAjAzfgMZAXmBJKQRTMQM9RBxu2978ot1KJJBfk1Njw1lWrYCZiQ1uaNhXykHrBHYiBxDE/uVSAEmQ9IJyxB++khsNe7WWT2re2JW+OzfAgMBAAECgYEAz5OLRbth6CKRJODYRYBb+y6kKPoVJI8v4AlEPofv6wy0PpE0UIH2uS83J0ghkfi5Mzoo4OdvZ/Yoxle9738HuRrDVYzDgsr2mGmr11ESVhe7jmdrPryURai0qedjpSVgfY9QrQsgOilPR+GYkkOh0szhwkm4KHIKx8bdxpHvHCECQQD+IGFGNHov+3/HQJmcuqLRUizEbsi4mkKhiqcInQ482o+7uoysVYjszIkAlpDXVlxMqPEeVn0p9rVChJxiBMlxAkEA9ARJECnNP+y6eePT6ueii10p1wajUjcxL30bqYLPVWuhSICmttCoNiApIj4HFQSQBxDZXoSODEuo9m3TWJFzTwJBAN7wXSYP55msk36jx59dhHUKGEgDwIdinU3Gq5682b69JxdUIxEUwNis3wvrCwo+sx51n4Iz8f4cdwvx9pdvB6ECQQDd9Lfwt9U2fEHydUVhumijk45nRGZydjmLFKWAvreQ32HI7Ry31XvsH7zKpNkUSR4pDy5pRvFeRcPew28mdMcJAkAPW9D4FCgJAfH1v1be8YkP44sJ4nRlcm03hOx8/Ebp/Xx+lqHNsf0RIg+vO9PuD7vEm3ZAz5UXe4TamX6HwMxH';
var pub_key_str = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCpBL+SzNNpeJVAhP8XO91dPrQHf6w2k7aqwnWGjnYjRlmy7iaeUJT/wb3PoH+ioGNTJyPHvfYHalEmvi133K3N8NdHizaYTjm1hgNBhBIK8aPZCR76C3UtQPv4mqA5fTZEWnRbr8JrVJoFNEN2+4JQwCeDtaC3OzPPflETt6zdOQIDAQAB';
var rsa = new RSA(pri_key_str, pub_key_str);
describe('rsa', function() {
    it('instance', function() {
        try {
            new RSA();
        } catch (e) {
            e.should.be.equal('private_key_str or public_key_str is empty.');
        }
    });
    it('#encryptedByPrivateKey()', function() {
        var decrypted_str = '54ebf8dba2ecfbc4d251f4bf33d185f289bddbee8e831baeb5d6c6a2a3af95e38899c280664e89b1fbcfbb434c90648e12b358ac1c54b84726821881329f889b707393dc5beaaf0dc229652a24b4997733437674b035076189e0ebaee6f240e86c5bb32fb02ed932269b0dc39aa76edac1ad08108b52f8f1d48463ffdc7e8ef5';
        var plaintext = 'baofoo宝付支付';
        decrypted_str.should.be.equal(rsa.encryptedByPrivateKey(plaintext));
    });
    it('#decryptByPublicKey()', function() {
        var decrypted_str = '35101456384a8d3ce3cda1df4e7a7f2b06e711788347b15093d66d9b1ec174812d3098c4382cc58026f6a22df1eb86112492f6fca8df9853926fcd3cf584ea8857b4c36c2c243daa8a059254b1fd4928349d8cf841a2bb6189c3e509b1d51e8ea50ddda1dac80e2f3e30dd0bc46fa5ab16739ff7a39f529c30a9256c59241dab3533d7dec439d2774b7e7f0af482e5a66d60066585bc99ec74c01f5c49a74800785931222d5cfb3c3a2a40464c049b898b7600695ea1c819605e207217a271c01d653c17a3b5221645e29048400c1c69d8ecfc6d42825aece023dda2cd96e74d40da20f4f9a03e23c2a91249de69d83a803c657fc42a837b3dc337daa9988864427410cce782ce17e527ba356ddca9790c6748c2d8c3867319fb2b3a711b613078b79dd474eac0e2d0d8f6b03982af6c9f6bc52321132c93efe05392aa7ab1a9d194ef5b81210d7a57ece57f88aae3181479797a62fdda1ca88cb0be30e398848f033a8f5691dc91d340857980a5b694eaaa087051cbc85875d948d9bc5924e9a1a8d50a18be5496e6f5e89bd28068bb50b7006e6d5ace8b0437a34f11e93d61543d99098348db174f5264656a6407c52124c2d6d263e8c6322e728f87a6b28a25f764b01d22d3a2112374ddc9f073fbe07735273853a6a9ff01ba85e180a0684e33c7a0c4a16d3c29b684705981fc0e82d430e71872d5eb481c49095d964eab';
        var plaintext = '{"additional_info":"附加字段","biz_type":"0000","data_type":"json","member_id":"100000178","req_reserved":"保留","resp_code":"BF00190","resp_msg":"商户流水号不能重复","terminal_id":"100000859","trade_date":"20160627113833","trans_serial_no":"TSN14669987138080","txn_sub_type":"03","txn_type":"0431","version":"4.0.0.0"}';
        plaintext.should.be.equal(rsa.decryptByPublicKey(decrypted_str));
    });
    it('#encryptedByPrivateKey() not ok', function() {
        var plaintext = {};
        rsa.encryptedByPrivateKey(plaintext).should.be.equal('');
    });
    it('#decryptByPublicKey() not ok', function() {
        var decrypted_str = {};
        rsa.decryptByPublicKey(decrypted_str).should.be.equal('');
    });
});