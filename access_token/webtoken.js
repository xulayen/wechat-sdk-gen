
'use strict';
const request = require('request');
const qs = require('querystring');
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

function get_access_token(appId,appSecret){
    let reqUrl = 'https://api.weixin.qq.com/cgi-bin/token?';
    let params = {
        appid: appId,
        secret: appSecret,
        grant_type: 'client_credential'
    };

    let options = {
        method: 'get',
        url: reqUrl+qs.stringify(params)
    };
    console.log('\x1B[32m%s \x1B[0m', 'get_access_token：'+options.url);  //cyan  
    var accessToken=myCache.get('accessToken'+appId);
    if(accessToken===undefined){
        return new Promise((resolve, reject) => {
            request(options, function (err, res, body) {
                if (res) {
                    console.log('\x1B[32m%s \x1B[0m','get access info!')
                    console.log('\x1B[32m%s \x1B[0m',body);
                    myCache.set( "accessToken"+appId, body, 7200);
                    resolve(body);
                } else {
                    console.log('\x1B[31m%s \x1B[0m',err);
                    reject(err);
                }
            });
        })
    }else{
        return new Promise((resolve, reject)=>{
            console.log('access_token is not expire!');
            console.log(accessToken);
            resolve(accessToken);
        })
    }
};
module.exports=get_access_token;
