var ARGUMENTS_WRONG = 'arguments wrong';

var LOTTERYID_ERROR = "lottery id error";
var USERID_ERROR = 'appuser id error';
var WRONG_IP = 'wrong ip';


var sdkDl = require('../dl/sdkDl.js')

var lotteryBl = {

	getLotteryInfoUrl:'/getLotteryInfo',
	getLotteryInfoMethod:'get',

	startLotteryUrl:'/startLottery',
	startLotteryMethod:'post',

	getLotteryRecordUrl:'/getLotteryRecord',
	getLotteryRecordMethod:'get',

	getLotteryPrizeUrl:'/getLotteryPrize',
	getLotteryPrizeMethod:'get',

	userLotteryCountUrl:'/userLotteryCount',
	userLotteryCountMethod:'get',

}

lotteryBl.getLotteryInfo = function(lotteryid, appuserid, options, cb){
	if(arguments.length !== 4) return cb(ARGUMENTS_WRONG);

	if(!/^\w{24,24}$/.test(lotteryid)){
		return cb(LOTTERYID_ERROR)
	}
	var data = {
		"lotteryid":lotteryid,
		"appuserid":appuserid,
	}
	sdkDl.request({
			"url":'/'+options.version + lotteryBl.getLotteryInfoUrl, 
			"method": lotteryBl.getLotteryInfoMethod, 
			"host": options.widgetHost
		}, data, options, cb);
}

lotteryBl.startLottery = function(lotteryid, appuserid, recordip, options, cb){
	if(arguments.length !== 5) return cb(ARGUMENTS_WRONG);

	if(!/^\w{24,24}$/.test(lotteryid)){
		return cb(LOTTERYID_ERROR)
	}

	if(!/\d+\.\d+\.\d+\.\d+/.test(recordip)){
		return cb(WRONG_IP);
	}

	var data = {
		"lotteryid":lotteryid,
		"appuserid":appuserid,
		"recordip":recordip,
	}
	sdkDl.request({
			"url":'/'+options.version + lotteryBl.startLotteryUrl, 
			"method": lotteryBl.startLotteryMethod, 
			"host": options.widgetHost
		}, data, options, cb);
}

lotteryBl.getLotteryRecord = function(lotteryid, appuserid, options, cb){
	if(arguments.length !== 4) return cb(ARGUMENTS_WRONG);

	if(!/^\w{24,24}$/.test(lotteryid)){
		return cb(LOTTERYID_ERROR)
	}
	var data = {
		"lotteryid":lotteryid,
		"appuserid":appuserid,
	}
	sdkDl.request({
			"url":'/'+options.version + lotteryBl.getLotteryRecordUrl, 
			"method": lotteryBl.getLotteryRecordMethod, 
			"host": options.widgetHost
		}, data, options, cb);
}


lotteryBl.getLotteryPrize = function(lotteryid, appuserid, options, cb){
	if(arguments.length !== 4) return cb(ARGUMENTS_WRONG);

	if(!/^\w{24,24}$/.test(lotteryid)){
		return cb(LOTTERYID_ERROR)
	}
	var data = {
		"lotteryid":lotteryid,
		"appuserid":appuserid,
	}
	sdkDl.request({
			"url":'/'+options.version + lotteryBl.getLotteryPrizeUrl, 
			"method": lotteryBl.getLotteryPrizeMethod, 
			"host": options.widgetHost
		}, data, options, cb);
}

lotteryBl.userLotteryCount = function(lotteryid, appuserid, options, cb){
	if(arguments.length !== 4) return cb(ARGUMENTS_WRONG);

	if(!/^\w{24,24}$/.test(lotteryid)){
		return cb(LOTTERYID_ERROR)
	}
	var data = {
		"lotteryid":lotteryid,
		"appuserid":appuserid,
	}
	sdkDl.request({
			"url":'/'+options.version + lotteryBl.userLotteryCountUrl, 
			"method": lotteryBl.userLotteryCountMethod, 
			"host": options.widgetHost
		}, data, options, cb);

	
}



module.exports = lotteryBl
