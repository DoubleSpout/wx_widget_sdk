var muk = require('muk');
var should = require('should');
var sdkDl = require('../dl/sdkDl.js');
var sdk = require('../index.js');
var sdkRequest = require('../dl/sdkRequest.js');
var sdkIns;
var _clientId = "5245790aad1f453aae73a2a1";
var _clientkey = "10856caf8733f3466ebc7c9198dead0b";
var _host = "http://127.0.0.1:8080";

describe('sdk create api', function(){
	it('should exist create api', function(){
		should.exist(sdk.create);
	})   		
})


describe('sdkIns api', function(){
	it('should exist api', function(){
		sdkIns = sdk.create({
			clientId:_clientId,
			clientKey:_clientkey,
			widgetHost:_host
		})
		should.exist(sdkIns.options);
		should.equal(sdkIns.options.clientId,_clientId);
		should.equal(sdkIns.options.clientKey,_clientkey);
		should.equal(sdkIns.options.widgetHost,_host);
		should.equal(sdkIns.options.poolSize,50);
		should.equal(sdkIns.options.version,"v1");
		should.exist(sdkIns.registUser);
		should.exist(sdkIns.getUserInfo);
		should.exist(sdkIns.getVote);
		should.exist(sdkIns.createVote);
		should.exist(sdkIns.getUserVoteByGroup);
	})   		
})





describe('registUser api', function(){
/*	describe('name needed', function(){
		it('should do work', function(){
			var uobj = {
				name:"",
				appuserid:"",
				mobile:"",
				regip:""
			}
			sdkIns.registUser(uobj, function(err,res){
				should.equal(err,"name needed");
			})
		})
	})
*/
	describe('name needed', function(){
		it('should do work', function(){
			var uobj = {
				name:"joymap",
				appuserid:"",
				mobile:"",
				regip:""
			}
			sdkIns.registUser(uobj, function(err,res){
				should.equal(err,"wrong appuserid");
			})
		})
	})

	describe('name needed', function(){
		it('should do work', function(){
			var uobj = {
				name:"joymap",
				appuserid:"123456",
				mobile:"1333333333211a",
				regip:""
			}
			sdkIns.registUser(uobj, function(err,res){
				should.equal(err,"wrong mobile");
			})
		})
	})


	describe('wrong ip', function(){
		it('should do work', function(){
			var uobj = {
				name:"joymap",
				appuserid:"123456",
				mobile:"13333333333",
				regip:"123213"
			}
			sdkIns.registUser(uobj, function(err,res){
				should.equal(err,"wrong ip");
			})
		})
	})


	describe('muk request', function(){
		before(function(){
			muk(sdkDl, 'request', function(reqObj, data, options, cb) {
				should.equal(reqObj.url,"/v1/registUser");
				should.equal(reqObj.method,"post");
				should.equal(reqObj.host, _host);

				should.equal(data.name,"joymap");
				should.equal(data.appuserid,"123456");
				should.equal(data.mobile,"13333333333");
				should.equal(data.regip,"127.0.0.1");

				cb(null,"ok")
  			});
		})	
		it('should do work', function(){
			var uobj = {
				name:"joymap",
				appuserid:"123456",
				mobile:"13333333333",
				regip:"127.0.0.1"
			}
			sdkIns.registUser(uobj, function(err,res){
				should.not.exist(err);
				should.equal(res,"ok");
			})
		})
		after(function(){
			muk.restore();
		})
	})

})





describe('getUserInfo api', function(){

	describe('userid needed', function(){
		it('should do work', function(){
			var userid = ""
			sdkIns.getUserInfo(userid, function(err,res){
				should.equal(err,"wrong appuserid");
			})
		})
	})

	

	describe('muk request', function(){
		before(function(){
			muk(sdkDl, 'request', function(reqObj, data, options, cb) {
				should.equal(reqObj.url,"/v1/getUserInfo");
				should.equal(reqObj.method,"get");
				should.equal(reqObj.host, _host);

				should.equal(data.appuserid,"123456");
				cb(null,"ok")
  			});
		})	
		it('should do work', function(){
			var userid = "123456"
			sdkIns.getUserInfo(userid, function(err,res){
				should.not.exist(err);
				should.equal(res,"ok");
			})
		})
		after(function(){
			muk.restore();
		})
	})

})



describe('getVote api', function(){

	describe('groupid needed', function(){
		it('should do work', function(){
			var groupid = ""
			sdkIns.getVote(groupid, function(err,res){
				should.equal(err,"groupid error");
			})
		})
	})

	describe('muk request', function(){
		before(function(){
			muk(sdkDl, 'request', function(reqObj, data, options, cb) {
				should.equal(reqObj.url,"/v1/getVote");
				should.equal(reqObj.method,"get");
				should.equal(reqObj.host, _host);

				should.equal(data.groupid,"123456789012345678901234");
				cb(null,"ok")
  			});
		})	
		it('should do work', function(){
			var groupid = "123456789012345678901234"
			sdkIns.getVote(groupid, function(err,res){
				should.not.exist(err);
				should.equal(res,"ok");
			})
		})
		after(function(){
			muk.restore();
		})
	})

})





describe('createVote api', function(){

	describe('groupid needed', function(){
		it('should do work', function(){
			var userid = ""
			var voteid = ""
			var ip = ""

			sdkIns.createVote(userid, voteid, ip, function(err,res){
				should.equal(err,"appuser id error");
			})
		})
	})

	describe('voteid needed', function(){
		it('should do work', function(){
			var userid = "1234567890"
			var voteid = ""
			var ip = ""

			sdkIns.createVote(userid, voteid, ip, function(err,res){
				should.equal(err,"voteid error");
			})
		})
	})


	describe('voteid needed', function(){
		it('should do work', function(){
			var userid = "1234567890"
			var voteid = "123456789012345678901234"
			var ip = "aaa"

			sdkIns.createVote(userid, voteid, ip, function(err,res){
				should.equal(err,"wrong ip");
			})
		})
	})



	describe('muk request', function(){
		before(function(){
			muk(sdkDl, 'request', function(reqObj, data, options, cb) {
				should.equal(reqObj.url,"/v1/createVote");
				should.equal(reqObj.method,"post");
				should.equal(reqObj.host, _host);

				should.equal(data.appuserid,"1234567890");
				should.equal(data.voteid,"123456789012345678901234");
				should.equal(data.ip,"127.0.0.1");
				cb(null,"ok")
  			});
		})	
		it('should do work', function(){
			var userid = "1234567890"
			var voteid = "123456789012345678901234"
			var ip = "127.0.0.1"
			sdkIns.createVote(userid, voteid, ip, function(err,res){
				should.not.exist(err);
				should.equal(res,"ok");
			})
		})
		after(function(){
			muk.restore();
		})
	})

})





describe('getUserVoteByGroup api', function(){

	describe('userid needed', function(){
		it('should do work', function(){
			var userid = ""
			var groupid = ""

			sdkIns.getUserVoteByGroup(userid, groupid, function(err,res){
				should.equal(err,"appuser id error");
			})
		})
	})

	describe('groupid needed', function(){
		it('should do work', function(){
			var userid = "1234567890"
			var groupid = ""

			sdkIns.getUserVoteByGroup(userid, groupid,  function(err,res){
				should.equal(err,"groupid error");
			})
		})
	})


	describe('muk request', function(){
		before(function(){
			muk(sdkDl, 'request', function(reqObj, data, options, cb) {
				should.equal(reqObj.url,"/v1/getUserVoteByGroup");
				should.equal(reqObj.method,"get");
				should.equal(reqObj.host, _host);

				should.equal(data.appuserid,"1234567890");
				should.equal(data.groupid,"123456789012345678901234");

				cb(null,"ok")
  			});
		})	
		it('should do work', function(){
			var userid = "1234567890"
			var groupid = "123456789012345678901234"

			sdkIns.getUserVoteByGroup(userid, groupid, function(err,res){
				should.not.exist(err);
				should.equal(res,"ok");
			})
		})
		after(function(){
			muk.restore();
		})
	})

})



describe('sdkDl api', function(){
	describe('supportMethed test', function(){
		it('should do work', function(){
			should.equal(JSON.stringify(sdkDl.supportMethed), JSON.stringify(['get','post','put','delete']));
		})
	})

	describe('md5 test', function(){
		it('should do work', function(){
			var md5str = sdkDl.md5("abc123");
			should.equal(md5str, "e99a18c428cb38d5f260853678922e03");
		})
	})


	describe('createSign test', function(){
		it('should do work', function(){
			var key = "1234567890123456789012"
			var data = {}
			data.clientid = "222222222222222212345678"
			data.sign = "8ffc9b89d1354a77b367101df2ab2af2"
			data.timestamp = "1234567890"
			data.param = "aaa";

			sdkDl.createSign(data, {clientKey:key});
			should.equal("8ffc9b89d1354a77b367101df2ab2af2", data.sign);
		})
	})


	describe('request test get', function(){
		before(function(){
			muk(sdkRequest, 'doReq', function(opts, cb) {
				should.equal(opts.headers["Content-Length"], "8");
				should.equal(opts.method, "get");
				should.equal(opts.uri, "http://127.0.0.1/test/test?timestamp=1234567890&clientid=222222222222222212345678&param=aaa&sign=8ffc9b89d1354a77b367101df2ab2af2");
				should.equal(opts.timeout, 1000*10);

				cb(null, 'ok')
  			});
		})	
		it('should do work', function(){
			var reqObj = {}
			reqObj.headers = {"Content-Length":"8"}
			reqObj.method = "get";
			reqObj.url = "/test/test"
			reqObj.host = "http://127.0.0.1"

			var data = {}
			data.timestamp = "1234567890";
			data.clientid = "222222222222222212345678"
			data.param = "aaa"

			var options = {clientKey:"1234567890123456789012"}

			sdkDl.request(reqObj, data, options, function(err,res){

				should.not.exist(err);
				should.equal(res,"ok");
			});
		})


		after(function(){
			muk.restore();
		})
	})



describe('request test post', function(){
		before(function(){
			muk(sdkRequest, 'doReq', function(opts, cb) {
				var data = {
					"timestamp":"1234567890",
					"clientid":"222222222222222212345678",
					"param":"aaa",
					"sign":"8ffc9b89d1354a77b367101df2ab2af2"
				}
				should.equal(opts.method, "post");
				should.equal(opts.headers["Content-Length"], "8");
				should.equal(JSON.stringify(opts.form),JSON.stringify(data))
				should.equal(opts.uri, "http://127.0.0.1/test/test");
				should.equal(opts.timeout, 1000*10);
				cb(null, 'ok')
  			});
		})	
		it('should do work', function(){
			var reqObj = {}
			reqObj.headers = {"Content-Length":"8"}
			reqObj.method = "post";
			reqObj.url = "/test/test"
			reqObj.host = "http://127.0.0.1"

			var data = {}
			data.timestamp = "1234567890";
			data.clientid = "222222222222222212345678"
			data.param = "aaa"

			var options = {clientKey:"1234567890123456789012"}

			sdkDl.request(reqObj, data, options, function(err,res){
				should.not.exist(err);
				should.equal(res,"ok");
			});
		})
		after(function(){
			muk.restore();
		})
	})
})
