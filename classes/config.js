/**
 * Config wrapper
 * @module classes/config
 */

var config = require('../config.json');

/**
 * Gets the mysql host
 * @returns {string}
 */
exports.getMySQLHost = function() {
    return config.mysql.host;
};

/**
 * Sets the mysql host
 * @param value The host
 */
exports.setMySQLHost = function(value) {
    config.mysql.host = value;
};

/**
 * Gets the mysql username
 * @returns {string}
 */
exports.getMySQLUser = function() {
    return config.mysql.user;
};

/**
 * Sets the mysql user
 * @param value The user
 */
exports.setMySQLUser = function(value) {
    config.mysql.user = value;
};

/**
 * Gets the mysql password
 * @returns {string}
 */
exports.getMySQLPassword = function() {
    return config.mysql.password;
};

/**
 * Sets the mysql password
 * @param value The password
 */
exports.setMySQLPassword = function(value) {
    config.mysql.password = value;
};

/**
 * Gets the mysql database name
 * @returns {string}
 */
exports.getMySQLDatabase = function() {
    return config.mysql.database;
};

/**
 * Gets the mysql database name
 * @param value The mysql database name
 */
exports.setMySQLDatabase = function(value) {
    config.mysql.database = value;
};

/**
 * Gets the mysql pool size
 * @returns {int}
 */
exports.getMySQLPoolSize = function() {
    return config.mysql.poolsize;
};

/**
 * Sets the mysql pool size
 * @param value The pool size
 */
exports.setMySQLPoolSize = function(value) {
    config.mysql.poolSize = value;
};

/**
 * Gets the webinterface port
 * @returns {int}
 */
exports.getWebInterfacePort = function() {
    return config.wi_port;
};

/**
 * Sets the webinterface port
 * @param value The webinterface port
 */
exports.setWebInterfacePort = function(value) {
    config.mysql.wi_port = value;
};

/**
 * Checks if https is enabled
 * @returns {boolean}
 */
exports.isHTTPSEnabled = function() {
    return config.https.enabled;
};

/**
 * Sets the value whether to enable https or not
 * @param value true or false
 */
exports.setHTTPSEnabled = function(value) {
    config.https.enabled = value;
};

/**
 * Checks if SPDY (HTTP/2.0) is enabled
 * @returns {boolean}
 */
exports.isSPDYEnabled = function() {
    return config.https.spdy;
};

/**
 * Sets the value whether to enable SPDY (HTTP/2.0) or not
 * @param value true or false
 */
exports.setSPDYEnabled = function(value) {
    config.https.spdy = value;
};

/**
 * Gets the domain of the webinterface
 * @returns {string}
 */
exports.getDomain = function() {
    return config.domain;
};

/**
 * Sets the domain of the webinterface
 * @param value The domain
 */
exports.setDomain = function(value) {
    config.domain = value;
};

/**
 * Gets the port where the daemons connect
 * @returns {int}
 */
exports.getCloudSystemPort = function() {
    return config.cloudsystem_port;
};

/**
 * Sets the port where the daemons connect
 * @param value The port
*/
exports.setCloudSystemPort = function(value) {
    config.cloudsystem_port = value;
};

/**
 * Gets the IP where the webserver should listen
 * @returns {string}
 */
exports.getListenIP = function() {
    return config.listenip;
};

/**
 * Sets the IP where the webserver should listen
 * @param value The IP
 */
exports.setListenIP = function(value) {
    config.listenip = value;
};

/**
 * Checks if the cloudsystem is in debug mode
 * @returns {boolean}
 */
exports.isDebugMode = function() {
    return config.debug;
};

/**
 * Sets the value whether the cloudsystem is in debug mode or not
 * @param value The value
 */
exports.setDebugMode = function(value) {
    config.debug = value;
};
