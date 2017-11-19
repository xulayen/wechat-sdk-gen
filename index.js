#!/usr/bin/env node

var program = require('commander');
var package = require('package')(module);
var access_token=require('./access_token/webtoken');
var getticket=require('./ticket/ticket');
var getsign=require('./signature/sign');

program
  .version(package.version)
  .option('-w, --wechatInfo [appid] [appsecrect] [timestamp] [nonceStr] [url]','get access_token and signature support')
  .option('-v, --version','output the version number')
  .parse(process.argv);

if(program.wechatInfo) {
    var appid= process.argv.slice(2)[1];
    var appsecrect= process.argv.slice(2)[2];
    var timestamp= process.argv.slice(2)[3];
    var nonceStr= process.argv.slice(2)[4];
    var url= process.argv.slice(2)[5];
    access_token(appid,appsecrect)
    .then(function (data) {
      var access=JSON.parse(data);
      var access_token=access['access_token'];
      getticket(appid,access_token).then(t => {
          var sign=getsign(t.ticket,url,nonceStr,timestamp);
          console.log('\x1B[35m%s \x1B[0m',JSON.stringify({access_token: access_token,signature:sign}));
      })
    });
}else{
    //show help 
}
