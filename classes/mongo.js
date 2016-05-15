/**
 *  Helper class for Mongo
 *  @module classes/mongo
 */

var mongolib = require('mongoose');
var log = require('./log.js');
var Schema = mongolib.Schema;
var connectionURL;

module.exports = Mongo;

function Mongo(host, database, port, username, password) {
    if(username == undefined || password == undefined) {
        connectionURL = 'mongodb://' + host + ":" + port + "/" + database;
    } else {
        connectionURL = 'mongodb://' + username + ":" + password + "@" + host + ":" + port + "/" + database;
    }
}

Mongo.prototype.connect = function() {
    mongolib.connect(connectionURL, {server:{poolSize:4}});

    var db = mongolib.connection;
    db.on('error', function(err) {
        log.error("A Database-Error occurred! Errordetails:\n      " + err);
        log.info("Shutting down. Check your Connection-Settings!");
        process.exit(0);
    });
    db.once('open', function() {
        log.info("Connected to Database!");
    });
};

var Users = mongolib.model('Users', mongolib.Schema({
    username: String,
    password: String,               // Save in SHA512
    lastSID: String,
    rang: String,
    twofa: String,
    backupcode: Number
}));

var Daemons = mongolib.model('Daemons', mongolib.Schema({
    daemonname: String,
    daemonip: String,
    minport: Number,
    maxport: Number,
    online: Boolean,
    apikey: String
}));

var Plugins = mongolib.model('Plugins', mongolib.Schema({
    pluginname: String,
    version: String,
    size: String,
    hash: String
}));

var Worlds = mongolib.model('Worlds', mongolib.Schema({
    worldname: String,
    foldername: String,
    size: String,
    hash: String
}));

var Servertypes = mongolib.model('Servertypes', {
    typename: String,
    plugins: [{ type: Schema.Types.ObjectId, ref: 'Worlds' }],
    worlds: [Worlds],
    minfree: Number,
    csc: String
});

module.exports.getUserModel = function() {
    return Users;
};
module.exports.getDaemonModel = function() {
    return Daemons;
};
module.exports.getPluginModel = function() {
    return Plugins;
};
module.exports.getWorldModel = function() {
    return Worlds;
};
module.exports.getServertypeModel = function() {
    return Servertypes;
};