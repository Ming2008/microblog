var helper = {};
exports.helper = helper;

var log4js = require('log4js');
var fs = require('fs');
var path = require('path');

var objConfig = JSON.parse(fs.readFileSync("./models/log4j.json", "utf8"));
log4js.configure(objConfig);

/**
 * [logger for levels]
 * @type {[type]}
 */
var logDebug = log4js.getLogger('logDebug');
var logInfo = log4js.getLogger('logInfo');
var logWarn = log4js.getLogger('logWarn');
var logErr = log4js.getLogger('logErr');

/**
 * [write logs for levels]
 * @param  {[type]} msg [description]
 * @return {[type]}     [description]
 */
helper.writeDebug = function (msg) {
	if(msg===null)
		msg = "";
	logDebug.debug(msg);
};

helper.writeInfo = function (msg) {
	if(msg===null)
		msg = "";
	logInfo.info(msg);
};

helper.writeWarn = function (msg) {
	if(msg===null)
		msg = "";
	logWarn.warn(msg);
};
/**
 * [writeErr add param exception]
 * @param  {[type]} msg [description]
 * @param  {[type]} exp [description]
 * @return {[type]}     [description]
 */
helper.writeErr = function (msg,exp) {
	if(msg===null)
		msg = "";
	if(exp!=null)
		msg+="\r\n"+exp;
	logErr.error(msg);
};

/**
 * [The request for page]
 * @param  {[type]} app [description]
 * @return {[type]}     [description]
 */
exports.use = function (app) {
	app.use(log4js.connectLogger(logInfo, {level:'warn',format:':method:url'}));
}