var ARGUMENTS_WRONG = 'arguments must be 3';
var WRONG_USERID = 'wrong appuserid';
var WRONG_MOBILE = 'wrong mobile';
var WRONG_NAME = 'name needed';
var WRONG_IP = 'wrong ip';

var sdkDl = require('../dl/sdkDl.js');
var utils = require('./sdkUtils.js')
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
	if(!userObj.appuserid) return cb(WRONG_USERID);

	userObj.name = utils.filterXss(userObj.name);//过滤xss攻击
	userObj.appuserid = utils.filterXss(userObj.appuserid);

	if(userObj.mobile && !/^\d{11,11}$/.test(userObj.mobile)) return cb(WRONG_MOBILE);
	if(userObj.regip && !/\d+\.\d+\.\d+\.\d+/.test(userObj.regip)) return cb(WRONG_IP);

	sdkDl.request({
			"url":'/'+options.version + userBl.registUserUrl, 
			"method": userBl.registUserMethod, 
			"host": options.widgetHost
		}, userObj, options, cb);
}

userBl.getUserInfo = function(userid, options, cb){
	if(arguments.length !== 3) return cb(ARGUMENTS_WRONG);
	if(!userid) return cb(WRONG_USERID);

	sdkDl.request({
			"url":'/'+options.version + userBl.getUserInfoUrl, 
			"method": userBl.getUserInfoMethod, 
			"host": options.widgetHost
		}, {"appuserid":userid}, options, cb);
}




module.exports = userBl
