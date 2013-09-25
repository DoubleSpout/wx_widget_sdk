var ARGUMENTS_WRONG = 'arguments must be 3';
var ARGUMENTS_WRONG2 = 'arguments must be 4';
var VOTEID_ERROR = 'voteid error';
var USERID_ERROR = 'user id error';

var sdkDl = require('../dl/sdkDl.js')
var voteBl = {
	getVoteUrl:'/getVote',
	getVoteMethod:'get',
	createVoteUrl:'/createVote',
	createVoteMethod:'post'
}

voteBl.getVote = function(id, cb){
	if(arguments.length !== 2) return cb(ARGUMENTS_WRONG);
	if(!id){
		var  id = null
	} 
	if(id && !/\w{16,16}/.test(id)){
		return cb(VOTEID_ERROR)
	}

	sdkDl.request({
			"url":options.version + voteBl.getVoteUrl, 
			"method": voteBl.getVoteMethod, 
			"host": options.widgetHost
		}, {"id":id}, options, cb);
}

voteBl.createVote = function(userid, voteid, options, cb){
	if(arguments.length !== 4) return cb(ARGUMENTS_WRONG2);

	if(!/\w{16,16}/.test(userid)){
		return cb(USERID_ERROR)
	}
	if(!/\w{16,16}/.test(voteid)){
		return cb(VOTEID_ERROR)
	}

	sdkDl.request({
			"url":options.version + voteBl.getUserInfoUrl, 
			"method": voteBl.getUserInfoMethod, 
			"host": options.widgetHost
		}, {"userid":userid, "voteid":voteid}, options, cb);
}


module.exports = voteBl
