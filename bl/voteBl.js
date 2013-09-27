var ARGUMENTS_WRONG = 'arguments must be 3';
var ARGUMENTS_WRONG2 = 'arguments must be 5';
var VOTEID_ERROR = 'voteid error';
var GROUPID_ERROR = "groupid error"
var USERID_ERROR = 'appuser id error';
var WRONG_IP = 'wrong ip';

var sdkDl = require('../dl/sdkDl.js')

var voteBl = {
	getVoteUrl:'/getVote',
	getVoteMethod:'get',
	createVoteUrl:'/createVote',
	createVoteMethod:'post',
	getUserVoteByGroupUrl:'/getUserVoteByGroup',
	getUserVoteByGroupMethod:'get'
}

voteBl.getVote = function(id, options, cb){
	if(arguments.length !== 3) return cb(ARGUMENTS_WRONG);

	if(!/^\w{24,24}$/.test(id)){
		return cb(GROUPID_ERROR)
	}
	var data = {"groupid":id}
	sdkDl.request({
			"url":'/'+options.version + voteBl.getVoteUrl, 
			"method": voteBl.getVoteMethod, 
			"host": options.widgetHost
		}, data, options, cb);
}

voteBl.createVote = function(userid, voteid, ip, options, cb){
	if(arguments.length !== 5) return cb(ARGUMENTS_WRONG2);

	if(!userid){
		return cb(USERID_ERROR)
	}
	if(!/^\w{24,24}$/.test(voteid)){
		return cb(VOTEID_ERROR)
	}
	if(ip && !/\d+\.\d+\.\d+\.\d+/.test(ip)){
		return cb(WRONG_IP);
	}
	var data = {"appuserid":userid, "voteid":voteid, "ip":ip||null}
	sdkDl.request({
			"url":'/'+options.version + voteBl.createVoteUrl, 
			"method": voteBl.createVoteMethod, 
			"host": options.widgetHost
		}, data, options, cb);
}

voteBl.getUserVoteByGroup = function(userid, groupid, options, cb){
	if(arguments.length !== 4) return cb(ARGUMENTS_WRONG);

	if(!userid){
		return cb(USERID_ERROR)
	}
	if(!/^\w{24,24}$/.test(groupid)){
		return cb(GROUPID_ERROR)
	}
	var data = {"appuserid":userid, "groupid":groupid}
	sdkDl.request({
			"url":'/'+options.version + voteBl.getUserVoteByGroupUrl, 
			"method": voteBl.getUserVoteByGroupMethod, 
			"host": options.widgetHost
		}, data, options, cb);
}


module.exports = voteBl
