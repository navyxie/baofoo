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
- [`success`](#success) 检查处理结果是否成功
- [`getBind_Id`](#getBind_Id) 获取绑卡id:bind_id
- [`sendPayMessage`](#sendPayMessage) 获取支付验证码
- [`bindCardAndPay`](#bindCardAndPay) 绑卡并支付
- [`decryptByPublicKey`](#decryptByPublicKey) 解密密文数据

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

<a name="success" />

`success` 检查处理结果是否成功

```js
baofoo.success({
    resp_code: '0000'
}, function(err, data) {
    if(!err){
        //todo data.code === 0 is success
    }
}
});
```


<a name="getBind_Id" />

`getBind_Id` 获取绑卡id:bind_id

```js
baofoo.getBind_Id({
    acc_no:'银行卡',
    id_card: '身份证',
    id_holder: '姓名',
    mobile: '银行卡预留手机号',
    sms_code: '绑卡短信(若开通绑卡不发短信业务，可以不填写)'
}, function(err, bind_id) {
    if(!err){
        //todo bind_id
    }
}
});
```

<a name="sendPayMessage" />

`sendPayMessage` 获取支付验证码

```js
baofoo.sendPayMessage({
    acc_no:'银行卡',
    id_card: '身份证',
    id_holder: '姓名',
    mobile: '银行卡预留手机号',
    txn_amt: '购买金额（分）'
}, function(err, data) {
    if(!err){
        //todo data.code === 0 is success
    }
}
});
```

<a name="bindCardAndPay" />

`bindCardAndPay` 绑卡并支付

```js
baofoo.bindCardAndPay({
    acc_no:'银行卡',
    id_card: '身份证',
    id_holder: '姓名',
    mobile: '银行卡预留手机号',
    sms_code: '支付验证码',
    txn_amt: '购买金额（分）',
    trans_id: '商户订单号'
}, function(err, data) {
    if(!err){
        //todo data.code === 0 is success
    }
}
});
```

<a name="decryptByPublicKey" />

`decryptByPublicKey` 解密密文数据

```js
var plaintext = baofoo.decryptByPublicKey('261a490a45070b3dd58ca5efa058b35973f39ebbdff5356d942a36cfe364726d7092a4305b22e758c3d95d66967bff9de548353adc265b906cebc0e942bf3f077e9f92344197d5a710ac925f43f8aa0c89df16b4fcef412ee5f56a36d8dfbdda39389146d0a6ae760acf94618e14b4f0bf37b77fbb3481c7739a7b421f3037ff90d5b1dadab1ed480683f02b9c5ad718f7602de55b8db0733c7632113c7b3635aeb1f06ab852567508f1b8ade380b071eeefdba4584c785aeb6f9f8b5c488b4ef8dbec978ef33d4ead8f4950d5d10186484842c73d064c49097b0d3e2dc13b891cace19c4766c7e73f0f6241090ec14cb273d1e655d895da21aafc159058765367dfa7983ba1c60a9f752032e25fab9324562c6bfdf5c4ab921f6b99b07b36205c819564260bd5e096d6a613114f4a64331c795e27b4d4d5f138e4602ed2a45cac28a57dd93723de0324360574ba0f0b0732c3e5f423eb05b1e3518dcbef9018b5440e497f9981b0c12dceb27e7c951cdc3a3236f26c2fffc60f739013f674c096aa6ba969ad2291d1f1ca41e15054193c8c8c15d4702afdda3acf0b8aab30274d2f96b24db5addb57c0709146cb3058aa1f35b54bc544376f4b1d4791e71a5bbc7d2e37e4ae7b56ce77926c4c3cb6b36515e2d2ed4e3c4cfffeb57c2efc1becc0cf421f8f864e7b0284809fcac7863fe8201f47d8bd48ac0879796ffba9b64c8fd001a6a83bfb989671ece19ffd50c6fd0760efa8eea0788ab9f4d10df697ed1cb5e58c91c90d72ffe3d86447c19628d2efa86518e572b00c436f17671fca1beb8c77c74e9690ac111197b14f526d88e02da145dd629a7b5a6a7038b548680830b9c9fdb7aebfe927f3889e7f083f27d20ca7ad4ee698fdd2047f77d5bab199');
//plaintext 为data_type类型字符串
```
## test

```
npm test
npm run cov
```