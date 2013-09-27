var muk = require('muk');
var should = require('should');
var async = require('async');
var _clientId = "5245790aad1f453aae73a2a1"
var _clientKey = "10856caf8733f3466ebc7c9198dead0b"
var _gourpId = "52457954ad1f453aae73a2a3"
var _voteId = "5245795fad1f453aae73a2a4"
var _host = "http://127.0.0.1:8080";

var sdk = require('../index.js');
var sdkIns = sdk.create({
			clientId:_clientId,
			clientKey:_clientKey,
			widgetHost:_host
		});

async.series([
		function(done){
			var uobj = {
				name:"joymap",
				appuserid:"123456",
				mobile:"13333333333",
				regip:"127.0.0.1"
			}
			sdkIns.registUser(uobj, function(err,obj){
				console.log('registUser')
				if(err) return done(err);
				console.log(obj)
				done()
			})
		},
		function(done){
			sdkIns.getUserInfo("123456", function(err,obj){
				console.log('getUserInfo')
				if(err) return done(err);
				console.log(obj)
				done()
			})

		},
		function(done){
			sdkIns.getVote(_gourpId, function(err,obj){
				console.log('getVote')
				if(err) return done(err);
				console.log(obj)
				done()
			})

		},
		function(done){
			sdkIns.createVote("123456", _voteId, "127.0.0.1", function(err,obj){
				console.log('createVote')
				if(err) return done(err);
				console.log(obj)
				done()
			})

		},
		function(done){
			sdkIns.getUserVoteByGroup("123456", _gourpId, function(err,obj){
				console.log('getUserVoteByGroup')
				if(err) return done(err);
				console.log(obj)
				done()
			})
		},
	],
	function(err,result){
			err && console.log(err)
			process.exit();
	});