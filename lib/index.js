var userBl = require('../bl/userBl.js');
var voteBl = require('../bl/voteBl.js');
var config = require('../config/Config.json');
var noop = function(){}

function WidgetSdkClass(options){
	this.options = options;
}

WidgetSdkClass.prototype.registUser = function(userObj,cb){
	var cb = cb || noop;
	var userObj = userObj || {};
	userBl.registUser(userObj, this.options, cb);
}

WidgetSdkClass.prototype.getUserInfo = function(uid,cb){
	var cb = cb || noop;
	userBl.getUserInfo(uid, this.options, cb);
}

WidgetSdkClass.prototype.getVote = function(id,cb){
	var cb = cb || noop;
	voteBl.getVote(id, this.options, cb);
}

WidgetSdkClass.prototype.createVote = function(uid,cb){
	var cb = cb || noop;
	voteBl.createVote(uid, this.options, cb);
}


var create = function(options){
	var options = {
		clientId : options.clientId,
		clientKey : options.clientKey,
		widgetHost : options.widgetHost || config.defaultWidgetHost,
		version : options.version || config.defaultVersion
	}
	if(!/\w{16,16}/.test(options.clientId)){
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

