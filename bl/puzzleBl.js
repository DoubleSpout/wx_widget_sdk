var ARGUMENTS_WRONG = 'arguments wrong';

var PUZZLEID_ERROR = "group id error";
var RECORD_ERROR = 'record id error';
var QUESTION_ERROR = 'quesstion id error';
var PRIZE_ERROR = 'prize id error';
var USERID_ERROR = 'appuser id error';
var WRONG_IP = 'wrong ip';
var KEY_ERROR = 'key error'

var sdkDl = require('../dl/sdkDl.js')

var puzzleBl = {

	getPuzzleUrl:'/getPuzzle',
	getPuzzleMethod:'get',

	answerPuzzleUrl:'/answerPuzzle',
	answerPuzzleMethod:'post',

	getQuesstionTipsUrl:'/getQuesstionTips',
	getQuesstionTipsMethod:'get',

	getPuzzlePrizeUrl:'/getPuzzlePrize',
	getPuzzlePrizeMethod:'get',

	obtainPrizeUrl:'/obtainPrize',
	obtainPrizeMethod:'post',

	getUserPrizeRecordUrl:'/getUserPrizeRecord',
	getUserPrizeRecordMethod:'get',


	getUserPuzzleRecordUrl:'/getUserPuzzleRecord',
	getUserPuzzleRecordMethod:'get',



}

puzzleBl.getPuzzle = function(puzzleid, appuserid, options, cb){
	if(arguments.length !== 4) return cb(ARGUMENTS_WRONG);

	if(!/^\w{24,24}$/.test(puzzleid)){
		return cb(PUZZLEID_ERROR)
	}
	var data = {
		"puzzleid":puzzleid,
		"appuserid":appuserid,
	}
	sdkDl.request({
			"url":'/'+options.version + puzzleBl.getPuzzleUrl, 
			"method": puzzleBl.getPuzzleMethod, 
			"host": options.widgetHost
		}, data, options, cb);
}


puzzleBl.answerPuzzle = function(puzzleid, appuserid, recordid, questionid, key, options, cb){
	if(arguments.length !== 7) return cb(ARGUMENTS_WRONG);

	if(!/^\w{24,24}$/.test(puzzleid)){
		return cb(PUZZLEID_ERROR)
	}
	if(!/^\w{24,24}$/.test(recordid)){
		return cb(RECORD_ERROR)
	}
	if(!/^\w{24,24}$/.test(questionid)){
		return cb(QUESTION_ERROR)
	}
	if(!key){
		return cb(KEY_ERROR)
	}

	var data = {
		"puzzleid":puzzleid,
		"appuserid":appuserid,
		"recordid":recordid,
		"questionid":questionid,
		"key":key,
	}
	sdkDl.request({
			"url":'/'+options.version + puzzleBl.answerPuzzleUrl, 
			"method": puzzleBl.answerPuzzleMethod, 
			"host": options.widgetHost
		}, data, options, cb);
}


puzzleBl.getQuesstionTips = function(puzzleid, recordid, questionid, tipspos, options, cb){
	if(arguments.length !== 6) return cb(ARGUMENTS_WRONG);

	if(!/^\w{24,24}$/.test(puzzleid)){
		return cb(PUZZLEID_ERROR)
	}
	if(!/^\w{24,24}$/.test(recordid)){
		return cb(RECORD_ERROR)
	}
	if(!/^\w{24,24}$/.test(questionid)){
		return cb(QUESTION_ERROR)
	}
	
	var data = {
		"puzzleid":puzzleid,
		"recordid":recordid,
		"questionid":questionid,
		"tipspos":tipspos,
	}
	sdkDl.request({
			"url":'/'+options.version + puzzleBl.getQuesstionTipsUrl, 
			"method": puzzleBl.getQuesstionTipsMethod, 
			"host": options.widgetHost
		}, data, options, cb);
}



puzzleBl.getPuzzlePrize = function(puzzleid, appuserid, options, cb){
	if(arguments.length !== 4) return cb(ARGUMENTS_WRONG);

	if(!/^\w{24,24}$/.test(puzzleid)){
		return cb(PUZZLEID_ERROR)
	}
		
	var data = {
		"puzzleid":puzzleid,
		"appuserid":appuserid
	}
	sdkDl.request({
			"url":'/'+options.version + puzzleBl.getPuzzlePrizeUrl, 
			"method": puzzleBl.getPuzzlePrizeMethod, 
			"host": options.widgetHost
		}, data, options, cb);
}


puzzleBl.obtainPrize = function(puzzleid, appuserid, recordid, recordip, prizeid, options, cb){
	if(arguments.length !== 7) return cb(ARGUMENTS_WRONG);

	if(!/^\w{24,24}$/.test(puzzleid)){
		return cb(PUZZLEID_ERROR)
	}
	if(!/^\w{24,24}$/.test(recordid)){
		return cb(RECORD_ERROR)
	}
	if(!/^\w{24,24}$/.test(prizeid)){
		return cb(PRIZE_ERROR)
	}

	if(!/\d+\.\d+\.\d+\.\d+/.test(recordip)){
		return cb(WRONG_IP);
	}
	
	var data = {
		"puzzleid":puzzleid,
		"appuserid":appuserid,
		"recordid":recordid,
		"recordip":recordip,
		"prizeid":prizeid,
	}
	sdkDl.request({
			"url":'/'+options.version + puzzleBl.obtainPrizeUrl, 
			"method": puzzleBl.obtainPrizeMethod, 
			"host": options.widgetHost
		}, data, options, cb);
}


puzzleBl.getUserPrizeRecord = function(puzzleid, appuserid, options, cb){
	if(arguments.length !== 4) return cb(ARGUMENTS_WRONG);

	if(!/^\w{24,24}$/.test(puzzleid)){
		return cb(PUZZLEID_ERROR)
	}
	
	
	var data = {
		"puzzleid":puzzleid,
		"appuserid":appuserid,
	}
	sdkDl.request({
			"url":'/'+options.version + puzzleBl.getUserPrizeRecordUrl, 
			"method": puzzleBl.getUserPrizeRecordMethod, 
			"host": options.widgetHost
		}, data, options, cb);
}

puzzleBl.getUserPuzzleRecord = function(puzzleid, appuserid, options, cb){
	if(arguments.length !== 4) return cb(ARGUMENTS_WRONG);

	if(!/^\w{24,24}$/.test(puzzleid)){
		return cb(PUZZLEID_ERROR)
	}	
	var data = {
		"puzzleid":puzzleid,
		"appuserid":appuserid,
	}
	sdkDl.request({
			"url":'/'+options.version + puzzleBl.getUserPuzzleRecordUrl, 
			"method": puzzleBl.getUserPuzzleRecordMethod, 
			"host": options.widgetHost
		}, data, options, cb);
}



module.exports = puzzleBl
