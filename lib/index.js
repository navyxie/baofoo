var RSA = require('./rsa');
var _ = require('lodash');
var request = require('request');
var moment = require('moment');
var defaultParamErrorMsg = 'first param is not a object or the second param is not a function';
var defaultConfigKey = ['biz_type', 'id_card_type', 'acc_pwd', 'valid_date', 'valid_no', 'additional_info', 'req_reserved', 'terminal_id', 'member_id', 'trans_serial_no', 'trade_date'];

/**
 * 符号含义
 * 1 M 强制域(Mandatory) 必须填写的属性,否则会被认为格式错误
 * 2 C 条件域(Conditional) 某条件成立时必须填写的属性
 * 3 O 选用域(Optional) 选填属性
 * 4 R 原样返回域(Returned) 必须与先前报文中对应域的值相同的域
 */

/**
 * 交易子类
 * 01 实名建立绑定关系类交易
 * 02 解除绑定关系类交易
 * 03 查询绑定关系类交易
 * 04 支付类交易
 * 05 发送短信类交易
 * 06 交易状态查询类交易
 */


/**
 * [BaofooSdk 宝付认证支付SDK类]
 */
function BaofooSdk(config) {
    if (!_.isObject(config)) {
        throw 'param config is not a object.'
    }
    var defaultConfig = {
        version: "4.0.0.0", //版本号
        data_type: "json", //加密报文的数据类型（xml/json）
        txn_type: "0431", //交易类型
        biz_type: "0000", //接入类型
        id_card_type: "01", //证件类型固定01（身份证） 
        acc_pwd: "", //银行卡密码（传空）
        valid_date: "", //卡有效期 （传空）
        valid_no: "", //卡安全码（传空）
        additional_info: "", //附加字段
        req_reserved: "" //保留
    }
    this.config = _.extend(defaultConfig, config);
    this.crypto = new RSA(config.pri_key_str, config.pub_key_str);
}

/**
 * [_getDefaultConfig 获取默认的配置]
 * @return {[object]} [description]
 */
BaofooSdk.prototype._getDefaultConfig = function() {
    var config = {};
    var _config = this.config;
    _.each(defaultConfigKey, function(configkey) {
        config[configkey] = _config[configkey];
    });
    return config;
}

/**
 * [bindCard 实名建立绑定关系类交易]
 * @param  {[object]} bindJsonData [description]
 * @param  {[function]} cb [回调函数]
 * @return {[type]}              [description]
 */
BaofooSdk.prototype.bindCard = function(bindJsonData, cb) {
    if (!_.isObject(bindJsonData) || !_.isFuction(cb)) {
        return cb(defaultParamErrorMsg);
    }
    var defaultConfig = this._getDefaultConfig();
    //组装加密数据
    var dataContentJson = {};
    dataContentJson.txn_sub_type = bindJsonData.txn_sub_type || '01'; //交易子类(M),取值:01
    dataContentJson.trans_serial_no = bindJsonData.trans_serial_no || ''; //商户流水号(M),8-20 位字母和数字,每次请求都不可重复(当天和历史均不可重复)
    dataContentJson.trans_id = bindJsonData.trans_id || ''; //商户订单号(M),唯一订单号,8-20 位字母和数字,同一天内不可重复;
    dataContentJson.acc_no = bindJsonData.acc_no || ''; //绑定卡号(M),请求绑定的银行卡号
    dataContentJson.id_card_type = bindJsonData.id_card_type || defaultConfig.id_card_type || '01'; //身份证类型(O),默认 01 为身份证号
    dataContentJson.id_card = bindJsonData.id_card || ''; //身份证号(M)
    dataContentJson.id_holder = bindJsonData.id_holder || ''; //持卡人姓名(M)
    dataContentJson.mobile = bindJsonData.mobile || ''; //银行卡绑定手机号(M),预留手机号
    dataContentJson.acc_pwd = bindJsonData.acc_pwd || ''; //卡号密码(C),银行卡取款密码
    dataContentJson.valid_date = bindJsonData.valid_date || ''; //卡有效期(C)
    dataContentJson.valid_no = bindJsonData.valid_no || ''; //卡安全码(C),银行卡背后最后三位数字
    dataContentJson.pay_code = bindJsonData.pay_code || ''; //银行编码(M)
    dataContentJson.sms_code = bindJsonData.sms_code || ''; //短信验证码(C),绑定关系的短信验证码,若开通短信类交易则必填
    dataContentJson.additional_info = bindJsonData.additional_info || ''; //附加字段(O),长度不超过 128 位
    dataContentJson.req_reserved = bindJsonData.req_reserved || ''; //请求方保留域(O)
    this._post(dataContentJson, cb);
}

/**
 * [unbindCard 解除绑定关系类交易]
 * @param  {[object]} unbindJsonData [description]
 * @param  {[function]} cb [回调函数]
 * @return {[type]}                [description]
 */
BaofooSdk.prototype.unbindCard = function(unbindJsonData, cb) {
    if (!_.isObject(unbindJsonData) || !_.isFuction(cb)) {
        return cb(defaultParamErrorMsg);
    }
    var defaultConfig = this._getDefaultConfig();
    //组装加密数据
    var dataContentJson = {};
    dataContentJson.txn_sub_type = unbindJsonData.txn_sub_type || '02'; //交易子类(M),取值:01
    dataContentJson.trans_serial_no = unbindJsonData.trans_serial_no || ''; //商户流水号(M),8-20 位字母和数字,每次请求都不可重复(当天和历史均不可重复)
    dataContentJson.bind_id = unbindJsonData.bind_id || ''; //绑定标识号(M),用于绑定关系的唯一标识
    dataContentJson.additional_info = unbindJsonData.additional_info || ''; //附加字段(O),长度不超过 128 位
    dataContentJson.req_reserved = unbindJsonData.req_reserved || ''; //请求方保留域(O)
    this._post(dataContentJson, cb);
}

/**
 * [queryBindCard 查询绑定关系类交易]
 * @param  {[object]} queryBindJsonData [description]
 * @param  {[function]} cb [回调函数]
 * @return {[type]}                   [description]
 */
BaofooSdk.prototype.queryBindCard = function(queryBindJsonData, cb) {
    if (!_.isObject(queryBindJsonData) || !_.isFuction(cb)) {
        return cb(defaultParamErrorMsg);
    }
    var defaultConfig = this._getDefaultConfig();
    //组装加密数据
    var dataContentJson = {};
    dataContentJson.txn_sub_type = queryBindJsonData.txn_sub_type || '03'; //交易子类(M),取值:01
    dataContentJson.trans_serial_no = queryBindJsonData.trans_serial_no || ''; //商户流水号(M),8-20 位字母和数字,每次请求都不可重复(当天和历史均不可重复)
    dataContentJson.acc_no = queryBindJsonData.acc_no || ''; //绑定的卡号(M),请求绑定的银行卡号
    dataContentJson.additional_info = queryBindJsonData.additional_info || ''; //附加字段(O),长度不超过 128 位
    dataContentJson.req_reserved = queryBindJsonData.req_reserved || ''; //请求方保留域(O)
    this._post(dataContentJson, cb);
}

/**
 * [doPay 支付类交易]
 * @param  {[object]} payJsonData [description]
 * @param  {[function]} cb [回调函数]
 * @return {[type]}                   [description]
 */
BaofooSdk.prototype.doPay = function(payJsonData, cb) {
    if (!_.isObject(payJsonData) || !_.isFuction(cb)) {
        return cb(defaultParamErrorMsg);
    }
    var defaultConfig = this._getDefaultConfig();
    //组装加密数据
    var dataContentJson = {};
    dataContentJson.txn_sub_type = payJsonData.txn_sub_type || '04'; //交易子类(M),取值:01
    dataContentJson.trans_serial_no = payJsonData.trans_serial_no || ''; //商户流水号(M),8-20 位字母和数字,每次请求都不可重复(当天和历史均不可重复)
    dataContentJson.trans_id = payJsonData.trans_id || ''; //商户订单号(M),唯一订单号,8-20 位字母和数字,同一天内不可重复;
    dataContentJson.bind_id = payJsonData.bind_id || ''; //绑定标识号(M),用于绑定关系的唯一标识
    dataContentJson.txn_amt = payJsonData.txn_amt || ''; //短信验证码(C),单位:分例:1 元则提交 100
    dataContentJson.sms_code = payJsonData.sms_code || ''; //交易金额(M),绑定关系的短信验证码,若开通短信类交易则必填
    dataContentJson.additional_info = payJsonData.additional_info || ''; //附加字段(O),长度不超过 128 位
    dataContentJson.req_reserved = payJsonData.req_reserved || ''; //请求方保留域(O)
    this._post(dataContentJson, cb);
}

/**
 * [sendMessage 发送短信类交易]
 * @param  {[type]} msgJsonData [description]
 * @param  {[function]} cb [回调函数]
 * @return {[type]}             [description]
 */
BaofooSdk.prototype.sendMessage = function(msgJsonData, cb) {
    if (!_.isObject(msgJsonData) || !_.isFuction(cb)) {
        return cb(defaultParamErrorMsg);
    }
    var defaultConfig = this._getDefaultConfig();
    //组装加密数据
    var dataContentJson = {};
    dataContentJson.txn_sub_type = msgJsonData.txn_sub_type || '05'; //交易子类(M),取值:01
    dataContentJson.trans_serial_no = msgJsonData.trans_serial_no || ''; //商户流水号(M),8-20 位字母和数字,每次请求都不可重复(当天和历史均不可重复)
    dataContentJson.trans_id = msgJsonData.trans_id || ''; //商户订单号(M),唯一订单号,8-20 位字母和数字,同一天内不可重复;如果商户开通“发送短信类交易”,该订单号从发送短信类交易到当前交易都有效
    dataContentJson.acc_no = msgJsonData.acc_no || ''; //绑定的卡号(C),绑卡时必填
    dataContentJson.mobile = msgJsonData.mobile || ''; //绑定的卡号(C),绑定关系类交易必填支付类交易非必填
    dataContentJson.bind_id = msgJsonData.bind_id || ''; //绑定标识号(C),用于绑定关系的唯一标识
    dataContentJson.txn_amt = msgJsonData.txn_amt || ''; //短信验证码(C),单位:分例:1 元则提交 100
    dataContentJson.next_txn_sub_type = msgJsonData.next_txn_sub_type || ''; //下一步进行的交易子类(M),参考附录 3:交易子类
    dataContentJson.additional_info = msgJsonData.additional_info || ''; //附加字段(O),长度不超过 128 位
    dataContentJson.req_reserved = msgJsonData.req_reserved || ''; //请求方保留域(O)
    this._post(dataContentJson, cb);
}

/**
 * [queryOrder 交易状态查询类交易]
 * @param  {[object]} queryOrderJsonData [description]
 * @param  {[function]} cb [回调函数]
 * @return {[type]}                    [description]
 */
BaofooSdk.prototype.queryOrder = function(queryOrderJsonData, cb) {
    if (!_.isObject(queryOrderJsonData) || !_.isFuction(cb)) {
        return cb(defaultParamErrorMsg);
    }
    var defaultConfig = this._getDefaultConfig();
    //组装加密数据
    var dataContentJson = {};
    dataContentJson.txn_sub_type = queryOrderJsonData.txn_sub_type || '06'; //交易子类(M),取值:01
    dataContentJson.trans_serial_no = queryOrderJsonData.trans_serial_no || ''; //商户流水号(M),8-20 位字母和数字,每次请求都不可重复(当天和历史均不可重复)
    dataContentJson.orig_trans_id = queryOrderJsonData.orig_trans_id || ''; //原始商户订单号(M),由宝付返回,用于在后续类交易中唯一标识一笔交易
    dataContentJson.additional_info = queryOrderJsonData.additional_info || ''; //附加字段(O),长度不超过 128 位
    dataContentJson.req_reserved = queryOrderJsonData.req_reserved || ''; //请求方保留域(O)
    this._post(dataContentJson, cb);
}

/**
 * [_post post请求通用方法]
 * @param  {[type]}   dataContentJson [接口请求需要的加密JSON数据]
 * @param  {Function} cb              [description]
 * @return {[type]}                   [description]
 */
BaofooSdk.prototype._post = function(dataContentJson, cb) {
    var rsa = this.rsa;
    var defaultConfig = this._getDefaultConfig();
    //取请求默认必须要的值
    dataContentJson.biz_type = dataContentJson.biz_type || defaultConfig.biz_type || '0000'; //接入类型(C),默认 0000
    dataContentJson.terminal_id = dataContentJson.terminal_id || defaultConfig.terminal_id || ''; //终端号(M)
    dataContentJson.member_id = dataContentJson.member_id || defaultConfig.member_id || ''; //商户号(M),宝付提供给商户的唯一编号
    dataContentJson.trade_date = dataContentJson.trade_date ? moment(bindJsonData.trade_date).format('YYYYMMDDHHMMSS') : moment().format('YYYYMMDDHHMMSS'); //订单日期(M),14 位定长。格式:年年年年月月日日时时分分秒秒
    //组装请求数据
    var requestJson = {
        version: dataContentJson.version || defaultConfig.version || '4.0.0.0',
        terminal_id: dataContentJson.terminal_id,
        txn_type: dataContentJson.txn_type || '0431',
        txn_sub_type: dataContentJson.txn_sub_type,
        member_id: dataContentJson.member_id,
        data_type: defaultConfig.data_type || 'json',
        data_content: rsa.encryptedByPrivateKey(JSON.stringify(dataContentJson))
    };
    //请求宝付接口
    request.post({
        url: this.config.rquest_url,
        body: requestJson
    }, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            try {
                var resData = JSON.parse(body);
                cb(null, {
                    code: resData.resp_code,
                    msg: resData.resp_msg,
                    data: resData
                });
            } catch (e) {
                cb(e);
            }
        } else {
            cb(error, response, body);
        }
    })
}
module.exports = BaofooSdk;