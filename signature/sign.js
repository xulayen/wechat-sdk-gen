
'use strict';
const request = require('request');
const sha1 = require('sha1');

function getsignature(ticket,url,noncestr,timestamp){
    var s='jsapi_ticket='+ticket+'&noncestr='+noncestr+'&timestamp='+timestamp+'&url='+url;
    return sha1(s);
};
module.exports=getsignature;