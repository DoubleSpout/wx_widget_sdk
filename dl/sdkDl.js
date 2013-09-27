var request = require('request');
var sdkRequest = require('./sdkRequest.js');
var crypto = require('crypto');
var util = require('util');
var querystring = require('querystring');


var sdkDl = {
	supportMethed : ['get','post','put','delete']   //支持方法
}

var METHOD_ERROR = 'method error,must be '+ sdkDl.supportMethed.toString();

sdkDl.request = function(reqObj, data, options, cb){
	if(sdkDl.supportMethed.indexOf(reqObj.method) === -1) return cb(METHOD_ERROR);
	var opts = {};
	var data = data;
	var reqObj = reqObj;
	opts.headers = reqObj.headers || {};

	if(!data.timestamp){
		data.timestamp = Date.now();//加入timestamp
	}
	if(!data.clientid){
		data.clientid = options.clientId;
	}
	if(!data.sign){
		sdkDl.createSign(data, options);//签名参数
	}
	opts.uri = reqObj.host + reqObj.url
	if(reqObj.method === 'get' || reqObj.method === 'delete'){
		var qs = querystring.stringify(data);
		opts.uri += '?' + qs;
	}
	else if(reqObj.method === 'post' || reqObj.method === 'put' ){
		opts.form  = data;

	}
	
	opts.timeout = 1000*10;
	opts.method = reqObj.method;
	sdkRequest.doReq(opts, cb);
}


sdkDl.createSign = function(data, options){
	var str = '';
	var clientKey = options.clientKey;

	Object.keys(data)
		  .sort()
		  .forEach(function(v,i){
		  		if(v === 'sign') return;
		  		str += util.format('%s=%s', v, data[v]);
			})
	str = str.toLowerCase() + clientKey;

	var sign = sdkDl.md5(str).toLowerCase();
	data.sign = sign;
	return sign;
}

sdkDl.md5 = function(str, encoding){
  return crypto
    .createHash('md5')
    .update(str)
    .digest(encoding || 'hex');
};


module.exports = sdkDl;
