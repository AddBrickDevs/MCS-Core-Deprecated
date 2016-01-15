/**
 *  Daemon object
 *  @module classes/database/daemon
 */

var crypto = require('crypto');
var log = require('../log.js');
var config = require('../config.js');
var mongoClient = require('../mongo.js');

var daemons = [];

/**
 * Constructs the daemon object
 * @param name The name
 * @param ip The ip of the daemon
 * @param minport Minimum port for servers
 * @param maxport Maximum port for servers
 * @param apikey API key for auth
 * @constructor Daemon
 */
var Daemon = function(name, ip, minport, maxport, apikey) {
    this.name = name;
    this.ip = ip;
    this.minport = minport;
    this.maxport = maxport;
    if(apikey) {
        this.apikey = apikey;
    }
};

/**
 * Gets the name of the daemon
 * @returns {*}
 */
Daemon.prototype.getName = function() {
    return this.name;
};

/**
 * Sets the name of the daemon
 * @param value The name
 */
Daemon.prototype.setName = function(value) {
    this.name = value;
};

/**
 * Gets the IP of the daemon
 * @returns {*}
 */
Daemon.prototype.getIP = function() {
    return this.ip;
};

/**
 * Sets the IP of the daemon
 * @param value The IP
 */
Daemon.prototype.setIP = function(value) {
    this.ip = value;
};

/**
 * Gets the minimum port for servers
 * @returns {*}
 */
Daemon.prototype.getMinPort = function() {
    return this.minport;
};

/**
 * Sets the minimum port for servers
 * @param value The port
 */
Daemon.prototype.setMinPort = function(value) {
    this.minport = value;
};

/**
 * Gets the maximum port for servers
 * @returns {*}
 */
Daemon.prototype.getMaxPort = function() {
    return this.maxport;
};

/**
 * Sets the maximum port for servers
 * @param value The port
 */
Daemon.prototype.setMaxPort = function(value) {
    this.maxport = value;
};

/**
 * Gets the API key for auth
 * @returns {*}
 */
Daemon.prototype.getAPIKey = function() {
    if(this.apikey === undefined) {
        this.generateAPIKey();
    }
    return this.apikey;
};

/**
 * Generates the API key for auth
 */
Daemon.prototype.generateAPIKey = function() {
    this.apikey = crypto.randomBytes(8).toString('hex');
};

/**
 * Serializes the object to JSON
 * @returns {{name: *, ip: *, minport: *, maxport: *, apikey: *}}
 */
Daemon.prototype.toJSON = function() {
    return {
        name: this.getName(),
        ip: this.getIP(),
        minport: this.getMinPort(),
        maxport: this.getMaxPort(),
        apikey: this.getAPIKey()
    };
};

Daemon.prototype.save = function(){
    var DaemonModel = mongoClient.getDaemonModel();
    var newDaemon = new DaemonModel({
        daemonname: this.getName(),
        daemonip: this.getIP(),
        minport: this.getMinPort(),
        maxport: this.getMaxPort(),
        apikey: this.getAPIKey()
    });
    newDaemon.save(function(err) {

    });
};

Daemon.prototype.getDaemons = function() {
    return daemons;
};

Daemon.prototype.loadDaemons = function() {
    daemons = [];
    var DaemonModel = mongoClient.getDaemonModel();
    DaemonModel.find({}, function(err, daemon) {
        if(err) {

        }
        daemons.push(daemon);
    });
};

module.exports = Daemon;