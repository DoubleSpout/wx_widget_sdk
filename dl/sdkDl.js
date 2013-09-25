var request = require('request');
var crypto = require('crypto');
var util = require('util');
var querystring = require('querystring');

var sdkDl = {
	supportMethed : ['get','post','put','delete']
}

var METHOD_ERROR = 'method error,must be '+ sdkDl.supportMethed.toString();

sdkDl.request = function(reqObj, data, options, cb){
	if(sdkDl.supportMethed.indexOf(reqObj.method) === -1) return return cb(METHOD_ERROR);
	var opts = {};
	opts.headers = reqObj.headers || {};

	if(!data.timestamp){
		data.timestamp = Date.now();//加入timestamp
	}
	if(!data.sign){
		sdkDl.createSign(data, options);//签名参数
	}

	if(reqObj.method === 'get' || reqObj.method === 'delete'){
		opts.qs = querystring.stringify(data);
	}
	else if(reqObj.method === 'post' || reqObj.method === 'put' ){
		opts.body  = querystring.stringify(data);
		if(!opts.headers["Content-type"]){
			opts.headers["Content-type"] = "application/x-www-form-urlencoded; charset=utf-8";
		}
	}
	opts.uri = reqObj.host + reqObj.url;
	request(opts, function(err,res,body){
		 if(err) return cb(err);
		 try{
		 	var body = JSON.parse(body);
		 }
		 catch(e){
		 	return cb(e);
		 }
		 if(res.statusCode !== 200) return cb(body.error);
		 cb(null, body);
	});

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
	var sign = sdkDl.md5(str.toLowerCase()).toLowerCase();
	data.sign = sign;
}

sdkDl.md5 = function(str, encoding){
  return crypto
    .createHash('md5')
    .update(str)
    .digest(encoding || 'hex');
};


module.exports = sdkDl;
