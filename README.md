## 宝付认证支付 SDK

[![Build Status via Travis CI](https://travis-ci.org/navyxie/baofoo.svg?branch=master)](https://travis-ci.org/navyxie/baofoo) [![Coverage Status](https://coveralls.io/repos/github/navyxie/baofoo/badge.svg?branch=master)](https://coveralls.io/github/navyxie/baofoo?branch=master) [![NPM version](https://badge.fury.io/js/baofoo.png)](http://badge.fury.io/js/baofoo)

## install

```
npm install baofoo --save
```

## usage

```
var BAOFOO = require('baofoo');
var baofoo = new BAOFOO({
    member_id: '商户号',
    terminal_id: 'terminal_id',
    rquest_url: '宝付api请求地址',
    pri_key_str: '商户私钥字符串',
    pub_key_str: '宝付公钥字符串'
});
```

## API

- [`bindCard`](#bindCard) 实名建立绑定关系
- [`unbindCard`](#unbindCard) 解除绑定关系
- [`queryBindCard`](#queryBindCard) 查询绑定关系
- [`doPay`](#doPay) 支付
- [`sendMessage`](#sendMessage) 发送短信
- [`queryOrder`](#queryOrder) 交易状态查询

<a name="bindCard" />

`bindCard` 实名建立绑定关系

```js
baofoo.bindCard({
    trans_serial_no: '商户流水号',
    trans_id: '商户订单号',
    acc_no: '银行卡号',
    id_card: '身份证号',
    id_holder: '持卡人姓名',
    mobile: '银行卡绑定手机号',
    pay_code: '银行编码',
    additional_info: '附加字段',
    req_reserved: '请求方保留域',
    sms_code: '绑卡短信验证码'
}, function(err, data) {
    if(!err){
        //todo data.code === '0000' is success
    }
}
});
```

<a name="unbindCard" />

`unbindCard` 解除绑定关系

```js
baofoo.unbindCard({
    trans_serial_no: '商户流水号',
    trans_id: '商户订单号',
    bind_id: '绑定标识号'
}, function(err, data) {
    if(!err){
        //todo data.code === '0000' is success
    }
}
});
```

<a name="queryBindCard" />

`queryBindCard` 查询绑定关系

```js
baofoo.queryBindCard({
    trans_serial_no: '商户流水号',
    trans_id: '商户订单号',
    acc_no: '银行卡号'
}, function(err, data) {
    if(!err){
        //todo data.code === '0000' is success
    }
}
});
```

<a name="doPay" />

`doPay` 支付

```js
baofoo.doPay({
    trans_serial_no: '商户流水号',
    trans_id: '商户订单号',
    bind_id: '绑定标识号',
    txn_amt: '交易金额', //单位:分
    sms_code: '支付短信验证码(宝付发送)'
}, function(err, data) {
    if(!err){
        //todo data.code === '0000' is success
    }
}
});
```

<a name="sendMessage" />

`sendMessage` 发送短信

```js
//以发送支付短信认证码为例
baofoo.sendMessage({
    bind_id: bind_id,
    txn_amt: 1,
    next_txn_sub_type: '04' //交易子类
}, function(err, data) {
    if(!err){
        //todo data.code === '0000' is success
    }
}
});
```


<a name="queryOrder" />

`queryOrder` 交易状态查询

```js
baofoo.queryOrder({
    orig_trans_id: '原始商户订单号'
}, function(err, data) {
    if(!err){
        //todo data.code === '0000' is success
    }
}
});
```

## test

```
npm test
npm run cov
```