var ARGUMENTS_WRONG = 'arguments must be three,ex userObj, options, cb';
var WRONG_USERID = 'wrong userid';
var WRONG_MOBILE = 'wrong mobile';
var WRONG_NAME = 'name needed';
var WRONG_IP = 'name needed';

var sdkDl = require('../dl/sdkDl.js')
var userBl = {
	registUserUrl:'/registUser',
	registUserMethod:'post',
	getUserInfoUrl:'/getUserInfo',
	getUserInfoMethod:'get'
}
/*
userObj:{
	mobile
	name
	regIp
	agent
	userid
}
*/
userBl.registUser = function(userObj, options, cb){
	if(arguments.length !== 3) return cb(ARGUMENTS_WRONG);

	if(!userObj.name) return cb(WRONG_NAME);
	if(userObj.userid && !/\w{16,16}/.test(userObj.userid)) return cb(WRONG_USERID);
	if(userObj.mobile && !/\d{11,11}/.test(userObj.mobile)) return cb(WRONG_MOBILE);
	if(userObj.regIp && !/\d+\.\d+\.\d+\.\d+/.test(userObj.regIp)) return cb(WRONG_IP);

	sdkDl.request({
			"url":options.version + userBl.registUserUrl, 
			"method": userBl.registUserMethod, 
			"host": options.widgetHost
		}, userObj, options, cb);
}

userBl.getUserInfo = function(userid, options, cb){
	if(!/\w{16,16}/.test(userObj.userid)) return cb(WRONG_USERID);

	sdkDl.request({
			"url":options.version + userBl.getUserInfoUrl, 
			"method": userBl.getUserInfoMethod, 
			"host": options.widgetHost
		}, {"userid":userid}, options, cb);
}




module.exports = userBl
