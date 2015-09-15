/**
 *  Webserver wrapper
 *  @module classes/cloudlistener
 */

// Core modules
var config = require('./config.js');
var log = require('./log.js');
var net = require('net');
//var crypto = require('crypto');

var server = net.createServer({allowHalfOpen: false}, function(con){
    //con.
    log.debug('client connected!');
});

/**
 * Starts the TCP Server
 * @param cb callback
 */
exports.startServer = function(cb) {
    server.listen({port: config.getCloudSystemPort(), host: config.getListenIP()}, function() {
        if(cb){cb(config.getCloudSystemPort());}
    });
};

/**
 * Stops the TCP Server
 * @param cb callback
 */
exports.stopServer = function(cb) {
    server.close(function() {
        if(cb){cb();}
    });
};