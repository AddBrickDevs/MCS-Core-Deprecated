/**
 *  TCP Server Wrapper
 *  @module classes/cloudlistener
 */

// Core modules
var config = require('./config.js');
var log = require('./log.js');
var datamanager = require('./database/datamanager.js');
var net = require('net');
var msgpack = require('msgpack-js');
//var crypto = require('crypto');

var events = {
    "auth": function(socket, data) {
        log.debug("Auth " + data.apikey);

        var successful = false;
        datamanager.getDaemons().forEach(function(d) {
            if(d.apikey === data.apikey) {
                socket.write(msgpack.encode({
                    'event': 'welcome'
                }));
                successful = true;
            }
        });
        if(!successful) {
            socket.write(msgpack.encode({
                'event': 'failed'
            }));
            socket.close();
        }
    }
};

var server = net.createServer({allowHalfOpen: false}, function(con){
    log.debug('client connected!');
    con.on('data', function(msg){
        try {
            msg = msgpack.decode(msg);
        } catch(e) {
            log.debug('error decoding message: '+msg);
        }
        log.debug(JSON.stringify(msg));
        events[msg.event](con, msg);
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