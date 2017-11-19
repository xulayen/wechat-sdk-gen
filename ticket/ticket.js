
'use strict';
const request = require('request');
const qs = require('querystring');
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

function get_ticket(appId,access_token){
    let reqUrl = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?';
    let params = {
        access_token: access_token,
        type: 'jsapi'
    };

    let options = {
        method: 'get',
        url: reqUrl+qs.stringify(params)
    };
    console.log('\x1B[32m%s \x1B[0m','getticket:'+options.url);
    var ticket=myCache.get('jsapi_ticket'+appId);
    if(ticket===undefined){
        return new Promise((resolve, reject) => {
            request(options, function (err, res, body) {
                if (res) {
                    console.log('\x1B[32m%s \x1B[0m','get ticket info!')
                    console.log('\x1B[32m%s \x1B[0m',body);
                    myCache.set( "jsapi_ticket"+appId, body, 7200);
                    resolve(body);
                } else {
                    console.log('\x1B[31m%s \x1B[0m',err);
                    reject(err);
                }
            });
        })
    }else{
        return new Promise((resolve, reject)=>{
            console.log('\x1B[32m%s \x1B[0m','ticket is not expire!');
            console.log('\x1B[32m%s \x1B[0m',ticket);
            resolve(ticket);
        })
    }
};
module.exports=get_ticket;
