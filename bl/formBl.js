var ARGUMENTS_WRONG = 'arguments wrong';

var FORM_NAME_ERROR = "form name error";
var FORM_DATA_ERROR = "form data error";
var FORM_JSON_PARSE_ERROR = 'json parse error';
var USERID_ERROR = 'appuser id error';
var FORM_DATA_MUST_STRING = 'form data must string';


var sdkDl = require('../dl/sdkDl.js')

var formBl = {
	creatFormUrl:'/createForm',
	creatFormMethod:'post',
}

formBl.createForm = function(formname, json, appuserid, options, cb){
	if(arguments.length !== 5) return cb(ARGUMENTS_WRONG);
	var jsonobj = {};
	if(!/^\w{24,24}$/.test(appuserid)){
		return cb(USERID_ERROR)
	}
	if('string' != typeof json){
		return cb()
	}
	try{
		jsonobj = JSON.parse(json);
	}	
	catch(e){
		return cb(FORM_JSON_PARSE_ERROR)
	}
	var data = {
		appuserid:appuserid,
		formname:formname,
		formdata:json,
	}
	if(!data.formname){
		return cb(FORM_DATA_ERROR)
	}
	sdkDl.request({
			"url":'/'+options.version + formBl.creatFormUrl, 
			"method": formBl.creatFormMethod, 
			"host": options.widgetHost
		}, data, options, cb);
}


module.exports = formBl
