/**
 * [getRSAPrivateKeyPrefix 获取rsa私钥开头注解]
 * @return {[type]} [description]
 */
function getRSAPrivateKeyPrefix() {
    return '-----BEGIN PRIVATE KEY-----\r\n';
}
/**
 * [getRSAPrivateKeySuffix 获取rsa私钥结束注解]
 * @return {[type]} [description]
 */
function getRSAPrivateKeySuffix() {
    return '-----END PRIVATE KEY-----';
}
/**
 * [getRSAPublickKeyPrefix 获取rsa公钥开头注解]
 * @return {[type]} [description]
 */
function getRSAPublickKeyPrefix() {
    return '-----BEGIN PUBLIC KEY-----\r\n'
}
/**
 * [getRSAPublicKeySuffix 获取rsa公钥结束注解]
 * @return {[type]} [description]
 */
function getRSAPublicKeySuffix() {
    return '-----END PUBLIC KEY-----'
}
/**
 * [formatRSAKey 格式化rsa秘钥串，转为成每行64个字符的格式]
 * @param  {[type]} key [秘钥字符串]
 * @return {[type]}     [description]
 */
function formatRSAKey(key) {
    var len = key.length;
    var privateLen = 64; //private key 64 length one line
    var space = Math.floor(len / privateLen);
    var flag = len % privateLen === 0 ? true : false;
    var str = "";
    for (var i = 0; i < space; i++) {
        str += key.substr(i * privateLen, privateLen) + '\r\n';
    }
    if (!flag) {
        str += key.substring(space * privateLen) + '\r\n';
    }
    return str;
}
/**
 * [getRSAPrivateKey 根据秘钥字符串获取RSA私钥]
 * @param  {[type]} key [description]
 * @return {[type]}     [description]
 */
function getRSAPrivateKey(key) {
    return getRSAPrivateKeyPrefix() + formatRSAKey(key) + getRSAPrivateKeySuffix();
}
/**
 * [getRSAPublicKey 根据秘钥字符串获取RSA公钥]
 * @param  {[type]} key [description]
 * @return {[type]}     [description]
 */
function getRSAPublicKey(key) {
    return getRSAPublickKeyPrefix() + formatRSAKey(key) + getRSAPublicKeySuffix();
}
/**
 * [hex2bin description]
 * @param  {[type]} hex [description]
 * @return {[type]}     [description]
 */
function hex2bin(hex) {
    var bytes = [],
        str;
    for (var i = 0; i < hex.length - 1; i += 2)
        bytes.push(parseInt(hex.substr(i, 2), 16));
    return String.fromCharCode.apply(String, bytes);
}
/**
 * [generateSerialNo 随机生成商户流水号]
 * @return {[type]} [description]
 */
function generateSerialNo() {
    return 'TSN' + Date.now() + (1000 + Math.ceil((Math.random() * 8999)))
}

/**
 * [generateTransId 随机生成商户订单号]
 * @return {[type]} [description]
 */
function generateTransId() {
    return 'TI' + Date.now() + (1000 + Math.ceil((Math.random() * 8999)))
}

function isSuccess(resData){
    if (typeof resData !== 'object') {
        return false
    }
    return resData.resp_code === '0000';
}

function getPayCode(payCode){
    var bankCode = payCode;
    switch(payCode){
        case 'COMM':
            bankCode = 'BCOM';
            break;
        case 'SPABANK':
            bankCode = 'PAB';
            break;
        case 'SHBANK':
            bankCode = 'SHB';
            break;
    }
    return bankCode;
}
module.exports = {
    getRSAPrivateKey: getRSAPrivateKey,
    getRSAPublicKey: getRSAPublicKey,
    hex2bin: hex2bin,
    generateSerialNo: generateSerialNo,
    generateTransId: generateTransId,
    isSuccess: isSuccess,
    getPayCode:getPayCode
}