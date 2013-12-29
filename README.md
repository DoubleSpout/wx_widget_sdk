#wx_widget_sdk[![Build Status](https://travis-ci.org/DoubleSpout/wx_widget_sdk.png?branch=master)](https://travis-ci.org/DoubleSpout/wx_widget_sdk)
================
#安装方法：
		npm imstall wx_widget_sdk

#使用方法：
##初始化：

		var sdk = require('wx_widget_sdk');
		var _clientId = "5245790aad1f453aae73a2a1"
		var _clientKey = "10856caf8733f3466ebc7c9198dead0b"
		var _gourpId = "52457954ad1f453aae73a2a3"
		var _voteId = "5245795fad1f453aae73a2a4"
		var _host = "http://127.0.0.1:8080";

		var sdkIns = sdk.create({
					clientId:_clientId,
					clientKey:_clientKey,
					widgetHost:_host
				});

##注册应用用户:

		var uobj = {
			name:"joymap",
			appuserid:"123456",
			mobile:"13333333333",
			regip:"127.0.0.1"
		}
		sdkIns.registUser(uobj, function(err,obj){
			//do something
		})

##获取应用用户信息:

		sdkIns.getUserInfo(app_user_id, function(err,obj){
			//do something								
		})

##获取某次投票信息

		sdkIns.getVote(_gourpId, function(err,obj){
				//do something
		})

##用户发起一次投票

		sdkIns.createVote(app_user_id, _voteId, ipaddress, function(err,obj){
			//do something
		})

##查询某一用户，在这次投票的情况，他投过几票，投了什么：

		sdkIns.getUserVoteByGroup(user_id, _gourpId, function(err,obj){
				//do something
		})

##注册平台用户

		var uobj = {
			mobile:"13333333333",
			password:"123456",
			appuserid:"123456", //可选，如果有则会去绑定
			regip:"127.0.0.1",
			agent:"mac"
		}
		sdkIns.registPlatUser(uboj, function(err,obj){
			//do something
		})		
		
##如果app用户绑定了平台用户，则根据appuserid查找绑定用户的信息：

		sdkIns.getPlatUserInfoByAppUserId(appuid, function(err,obj){
				//do something
		})
		
##绑定平台用户和app用户：

		sdkIns.platUserBind(mobile,pwd,appuid, function(err,obj){
				//do something
		})
		
##平台用户登录：

		sdkIns.platUserLogin(mobile,pwd,appuid, function(err,obj){
				//do something
		})
		
##根据token获取用户信息：

		sdkIns.getPlatUserInfoByToken(mobile,pwd,appuid, function(err,obj){
				//do something
		})
		
##用户开始猜图的答题活动，将返回题目给用户：

		sdkIns.getPuzzle(mpuzzleid, appuid, function(err,obj){
				//do something
		})

##用户进行猜图活动，回答某一个题目：

		sdkIns.answerPuzzle(puzzleid, uid, recordid, questionid, key, function(err,obj){
				//do something
		})

##用户进行猜图活动，获得某一个题目的提示：

		sdkIns.getQuesstionTips(puzzleid, recordid, questionid, tipspos, function(err,obj){
				//do something
		})

##获得某次猜图活动的奖品：

		sdkIns.getPuzzlePrize(puzzleid, uid, function(err,obj){
				//do something
		})

##用户猜图游戏做完后，选择奖品获得奖品：

		sdkIns.obtainPrize(puzzleid, uid, recordid, recordip, prizeid, function(err,obj){
				//do something
		})

##用户猜图游戏做完后，获得用户的奖品记录：

		sdkIns.getUserPrizeRecord(puzzleid, uid, function(err,obj){
				//do something
		})

##获得用户猜图游戏的答题记录：

		sdkIns.getUserPuzzleRecord(puzzleid, uid, function(err,obj){
				//do something
		})

##获得某次抽奖活动的信息：

		sdkIns.getLotteryInfo(lotteryid, uid, function(err,obj){
				//do something
		})

##用户开始某次抽奖活动的抽奖：

		sdkIns.startLottery(lotteryid, uid, recordip, function(err,obj){
				//do something
		})

##获得用户的抽奖活动的得奖记录：

		sdkIns.getLotteryRecord(lotteryid, uid, function(err,obj){
				//do something
		})

##获得某次抽奖活动的奖品列表：

		sdkIns.getLotteryPrize(lotteryid, uid, function(err,obj){
				//do something
		})

##获得获得某次抽奖活动用户的抽奖次数，包括总次数和当前时间间隔次数：

		sdkIns.userLotteryCount(lotteryid, uid, function(err,obj){
				//do something
		})

##创建一个金数据表单：

		sdkIns.createForm(formname, formdata, uid, function(err,obj){
				//do something
		})


#测试命令：
node ./test/run.js 