var userBl = require('../bl/userBl.js');
var voteBl = require('../bl/voteBl.js');
var platUserBl = require('../bl/platUserBl.js');
var config = require('../config/Config.json');
var http = require('http');
var noop = function(){}

function WidgetSdkClass(options){
	this.options = options;
}
//app user
WidgetSdkClass.prototype.registUser = function(userObj,cb){
	var cb = cb || noop;
	var userObj = userObj || {};
	userBl.registUser(userObj, this.options, cb);
}

WidgetSdkClass.prototype.getUserInfo = function(uid,cb){
	var cb = cb || noop;
	userBl.getUserInfo(uid, this.options, cb);
}
//vote
WidgetSdkClass.prototype.getVote = function(groupid,cb){
	var cb = cb || noop;
	voteBl.getVote(groupid, this.options, cb);
}

WidgetSdkClass.prototype.createVote = function(uid,voteId,ip,cb){
	var cb = cb || noop;
	voteBl.createVote(uid, voteId, ip, this.options, cb);
}

WidgetSdkClass.prototype.getUserVoteByGroup = function(uid,groupid,cb){
	var cb = cb || noop;
	voteBl.getUserVoteByGroup(uid, groupid, this.options, cb);
}

//plat user
WidgetSdkClass.prototype.registPlatUser = function(uboj,cb){
	var cb = cb || noop;
	platUserBl.registPlatUser(uboj, this.options, cb);
}

WidgetSdkClass.prototype.getPlatUserInfoByAppUserId = function(appuid,cb){
	var cb = cb || noop;
	platUserBl.getPlatUserInfoByAppUserId(appuid, this.options, cb);
}

WidgetSdkClass.prototype.platUserBind = function(mobile,pwd,appuid,cb){
	var cb = cb || noop;
	platUserBl.platUserBind(mobile,pwd,appuid,this.options, cb);
}

WidgetSdkClass.prototype.platUserLogin = function(mobile,pwd,cb){
	var cb = cb || noop;
	platUserBl.platUserLogin(mobile,pwd,this.options, cb);
}

WidgetSdkClass.prototype.getPlatUserInfoByToken = function(token,cb){
	var cb = cb || noop;
	platUserBl.getPlatUserInfoByToken(token, this.options, cb);
}


var create = function(options){
	var options = {
		clientId : options.clientId,
		clientKey : options.clientKey.toLowerCase(),
		widgetHost : options.widgetHost || config.defaultWidgetHost,
		poolSize : options.poolSize || config.defaultPoolSize,
		version : options.version || config.defaultVersion
	}

	http.globalAgent.maxSockets = options.poolSize;

	if(!/\w{24,24}/.test(options.clientId)){
		throw('invalid clientId');
	}
	if(!/\w{32,32}/.test(options.clientKey)){
		throw('invalid clientKey');
	}

	return new WidgetSdkClass(options);
}


module.exports = {
	"create":create
}

