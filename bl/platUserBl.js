var ARGUMENTS_WRONG = 'arguments must be 3';
var ARGUMENTS_WRONG2 = 'arguments must be 5';
var ARGUMENTS_WRONG3 = 'arguments must be 4';
var UOBJ_ERROR = 'user object error';
var MOBILE_ERROR = 'mobile error';
var PASSWORD_ERROR = 'password error';

var sdkDl = require('../dl/sdkDl.js');
var utils = require('../lib/utils.js');

var Bl = {
	registPlatUserUrl:'/registPlatUser',
	registPlatUserMethod:'post',
	getPlatUserInfoByAppUserIdUrl:'/getPlatUserInfoByAppUserId',
	getPlatUserInfoByAppUserIdMethod:'get',
	platUserBindUrl:'/platUserBind',
	platUserBindMethod:'post',
	platUserLoginUrl:'/platUserLogin',
	platUserLoginMethod:'post',
	getPlatUserInfoByTokenUrl:'/getPlatUserInfoByToken',
	getPlatUserInfoByTokenMethod:'get',

}

//regist plat user
Bl.registPlatUser = function(uobj, options, cb){
	if(arguments.length !== 3) return cb(ARGUMENTS_WRONG);
	if(!uobj || 'object' !== typeof uobj){
		return cb(UOBJ_ERROR)
	}
	
	var data = uobj;
	sdkDl.request({
			"url":'/'+options.version + Bl.registPlatUserUrl, 
			"method": Bl.registPlatUserMethod, 
			"host": options.widgetHost
		}, data, options, cb);
}

//getPlatUserInfoByAppUserId
Bl.getPlatUserInfoByAppUserId = function(appuid, options, cb){
	if(arguments.length !== 5) return cb(ARGUMENTS_WRONG2);

	var data = {"appuserid":appuid}
	sdkDl.request({
			"url":'/'+options.version + Bl.getPlatUserInfoByAppUserIdUrl, 
			"method": Bl.getPlatUserInfoByAppUserIdMethod, 
			"host": options.widgetHost
		}, data, options, cb);
}

//platu user bind
Bl.platUserBind = function(mobile, pwd, appuid,options, cb){
	if(arguments.length !== 5) return cb(ARGUMENTS_WRONG2);

	if(!utils.check_mobile(mobile)){
		return cb(MOBILE_ERROR);
	}
	if(!utils.check_pwd(pwd)){
		return cb(PASSWORD_ERROR);
	}
	
	var data = {"appuserid":appuid, "mobile":mobile, "password":pwd}
	sdkDl.request({
			"url":'/'+options.version + Bl.platUserBindUrl, 
			"method": Bl.platUserBindMethod, 
			"host": options.widgetHost
		}, data, options, cb);
}

//plat user login
Bl.platUserLogin = function(mobile, pwd, options, cb){
	if(arguments.length !== 4) return cb(ARGUMENTS_WRONG3);

	if(!utils.check_mobile(mobile)){
		return cb(MOBILE_ERROR);
	}
	if(!utils.check_pwd(pwd)){
		return cb(PASSWORD_ERROR);
	}
	
	var data = {"mobile":mobile, "password":pwd}
	sdkDl.request({
			"url":'/'+options.version + Bl.platUserLoginUrl, 
			"method": Bl.platUserLoginMethod, 
			"host": options.widgetHost
		}, data, options, cb);
}


//get user by token
Bl.getPlatUserInfoByToken = function(token, options, cb){
	if(arguments.length !== 3) return cb(ARGUMENTS_WRONG);

	var data = {"token":token}
	sdkDl.request({
			"url":'/'+options.version + Bl.getPlatUserInfoByTokenUrl, 
			"method": Bl.getPlatUserInfoByTokenMethod, 
			"host": options.widgetHost
		}, data, options, cb);
}

module.exports = Bl
