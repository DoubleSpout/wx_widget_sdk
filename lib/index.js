var userBl = require('../bl/userBl.js');
var voteBl = require('../bl/voteBl.js');
var platUserBl = require('../bl/platUserBl.js');
var puzzleBl = require('../bl/puzzleBl.js');
var lotteryBl = require('../bl/lotteryBl.js');
var formBl = require('../bl/formBl.js')
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




WidgetSdkClass.prototype.getPuzzle = function(puzzleid, uid, cb){//获取猜图游戏
	var cb = cb || noop;
	puzzleBl.getPuzzle(puzzleid, uid, this.options, cb);
}

WidgetSdkClass.prototype.answerPuzzle = function(puzzleid, uid, recordid, questionid, key, cb){//回答问题

	var cb = cb || noop;
	puzzleBl.answerPuzzle(puzzleid, uid, recordid, questionid, key, this.options, cb);
}

WidgetSdkClass.prototype.getQuesstionTips = function(puzzleid, recordid, questionid, tipspos, cb){//获得提示
	if('function' === typeof tipspos){
		var cb = tipspos;
		tipspos = null;
	}
	var cb = cb || noop;
	puzzleBl.getQuesstionTips(puzzleid, recordid, questionid, tipspos, this.options, cb);
}

WidgetSdkClass.prototype.getPuzzlePrize = function(puzzleid, uid, cb){//获得某次猜图的礼品信息
	var cb = cb || noop;
	puzzleBl.getPuzzlePrize(puzzleid, uid, this.options, cb);
}

WidgetSdkClass.prototype.obtainPrize = function(puzzleid, uid, recordid, recordip, prizeid, cb){//领取奖品
	var cb = cb || noop;
	puzzleBl.obtainPrize(puzzleid, uid, recordid, recordip, prizeid, this.options, cb);
}

WidgetSdkClass.prototype.getUserPrizeRecord = function(puzzleid, uid, cb){//获得用户奖品记录
	var cb = cb || noop;
	puzzleBl.getUserPrizeRecord(puzzleid, uid, this.options, cb);
}

WidgetSdkClass.prototype.getUserPuzzleRecord = function(puzzleid, uid, cb){//获得用户答题完成记录
	var cb = cb || noop;
	puzzleBl.getUserPuzzleRecord(puzzleid, uid, this.options, cb);
}


WidgetSdkClass.prototype.getLotteryInfo = function(lotteryid, uid, cb){//获得此次猜图游戏
	var cb = cb || noop;
	lotteryBl.getLotteryInfo(lotteryid, uid, this.options, cb);
}

WidgetSdkClass.prototype.startLottery = function(lotteryid, uid, recordip, cb){//开始猜图
	var cb = cb || noop;
	lotteryBl.startLottery(lotteryid, uid, recordip, this.options, cb);
}

WidgetSdkClass.prototype.getLotteryRecord = function(lotteryid, uid, cb){//获得用户得奖记录
	var cb = cb || noop;
	lotteryBl.getLotteryRecord(lotteryid, uid, this.options, cb);
}

WidgetSdkClass.prototype.getLotteryPrize = function(lotteryid, uid, cb){//获得奖品列表及剩余
	var cb = cb || noop;
	lotteryBl.getLotteryPrize(lotteryid, uid, this.options, cb);
}

WidgetSdkClass.prototype.userLotteryCount = function(lotteryid, uid, cb){//获得用户抽奖记录
	var cb = cb || noop;
	lotteryBl.userLotteryCount(lotteryid, uid, this.options, cb);
}


WidgetSdkClass.prototype.createForm = function(formname, jsonObj, uid, cb){//获得金数据推送过来的json字符串
	var cb = cb || noop;
	formBl.createForm(formname, jsonObj, uid, this.options, cb);
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

