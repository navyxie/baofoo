var ursa = require('ursa');
var _ = require('lodash');
var rsaUtil = require('./util');
var DATALEN = 32; //数据分段加密
var UNIT = 8; //解密步长

/**
 * [RSA rsa加解密类]
 * @param {[type]} private_key_str [rsa私钥字符串]
 * @param {[type]} public_key_str  [rsa公钥字符串]
 */
function RSA(private_key_str, public_key_str) {
    if (!_.isString(private_key_str) || !_.isString(public_key_str)) {
        throw 'private_key_str or public_key_str is empty.'
    }
    try {
        this.rsaKey = ursa.createPrivateKey(rsaUtil.getRSAPrivateKey(private_key_str));
        this.rsaCrt = ursa.createPublicKey(rsaUtil.getRSAPublicKey(public_key_str));
    } catch (e) {
        throw e;
    }
}

/**
 * [encryptedByPrivateKey 商户私钥加密]
 * @return {[type]} [加密后的base64格式密文]
 */
RSA.prototype.encryptedByPrivateKey = function(encrypted_str) {
    var pos = 0;
    var encrypted = '';
    if (!_.isString(encrypted_str)) {
        return encrypted;
    }
    var base64Plaintext = new Buffer(encrypted_str).toString('base64');
    try {
        while (pos < base64Plaintext.length) {
            encrypted += this.rsaKey.privateEncrypt(base64Plaintext.substr(pos, DATALEN), 'utf8', 'hex');
            pos += DATALEN;
        }
    } catch (e) {
        console.error('baofoo rsa encryptedByPrivateKey error : ', e);
    }
    return encrypted;
}

/**
 * [decryptByPublicKey 宝付公钥解密]
 * @return {[type]} [解密后的utf8明文]
 */
RSA.prototype.decryptByPublicKey = function(decrypted_str) {
    var pos = 0;
    var decrypted = '';
    if (!_.isString(decrypted_str)) {
        return decrypted;
    }
    try {
        while (pos < decrypted_str.length) {
            var binData = rsaUtil.hex2bin(decrypted_str.substr(pos, DATALEN * UNIT));
            decrypted += this.rsaCrt.publicDecrypt(binData, 'binary', 'utf8');
            pos += DATALEN * UNIT;
        }
        decrypted = new Buffer(decrypted, 'base64').toString();
    } catch (e) {
        console.error('baofoo rsa decryptByPublicKey error : ', e);
    }
    return decrypted;
}
module.exports = RSA;