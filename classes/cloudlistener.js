/**
 *  TCP Server Wrapper
 *  @module classes/cloudlistener
 */

// Core modules
var config = require('./config.js');
var log = require('./log.js');
var net = require('net');
var msgpack = require('msgpack-js');
//var crypto = require('crypto');

var server = net.createServer({allowHalfOpen: false}, function(con){
    log.debug('client connected!');
    con.on('data', function(msg){
        try {
            msg = msgpack.decode(msg);
        } catch(e) {
            log.debug('error decoding message: '+msg);
        }
        log.debug(msg);
    });
    con.on('end', function() {
        log.debug('client disconnected');
    });
    con.on('error', function(err) {
        log.warn(err);
    });
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