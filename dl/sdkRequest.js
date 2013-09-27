var request = require('request');
var doRequest = {}
doRequest.doReq = function(opts, cb){//发送http请求

	request(opts, function(err,res,body){
		 if(err) return cb(err);
		 try{
		 	var body = JSON.parse(body);
		 }
		 catch(e){
		 	return cb(e);
		 }
		 if(res.statusCode !== 200) return cb(body);
		 cb(null, body);
	});
}

module.exports = doRequest