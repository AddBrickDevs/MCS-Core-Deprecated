/**
 *  Helper class for Mongo
 *  @module classes/mongo
 */

var mongolib = require('mongoose');
var log = require('./log.js');
var Schema = mongolib.Schema;
var connectionURL;

/*
* var queries = [
 "CREATE TABLE IF NOT EXISTS `Users` (username PRIMARYKEY VARCHAR(22), password VARCHAR(128), rang ENUM(\'Viewer\', \'Dev\', \'Admin\'), twofa VARCHAR(16) NOT NULL, backupcode INT(20) NOT NULL)", //Password = SHA 512
 "CREATE TABLE IF NOT EXISTS `Daemons` (daemonname PRIMARYKEY VARCHAR(22), daemonip VARCHAR(16), minport INT(5), maxport INT(5), apikey VARCHAR(16))",
 "CREATE TABLE IF NOT EXISTS `Plugins` (pluginname PRIMARYKEY VARCHAR(32), version VARCHAR(100), size VARCHAR(8), hash VARCHAR(40))", //32 Chars should be enough
 "CREATE TABLE IF NOT EXISTS `Servertypes` (name PRIMARYKEY VARCHAR(22), plugins TEXT, worlds TEXT, minfree INT(5), csc TEXT)",
 "CREATE TABLE IF NOT EXISTS `Worlds` (worldname PRIMARYKEY VARCHAR(32), foldername TEXT, size VARCHAR(8), hash VARCHAR(40))"
 ];
* */

module.exports = Mongo;

function Mongo(host, database) {
    connectionURL = 'mongodb://' + host + "/" + database;
}

Mongo.prototype.connect = function() {
    mongolib.connect(connectionURL);
};

var Users = mongolib.model('Users', new Schema({
    username: String,
    password: String,               // Save in SHA512
    rang: String,
    twofa: String,
    backupcode: Number
}));

var Daemons = mongolib.model('Daemons', {
    daemonname: String,
    daemonip: String,
    minport: Number,
    maxport: Number,
    apikey: String
});

var Plugins = mongolib.model('Plugins', {
    pluginname: String,
    version: String,
    size: String,
    hash: String
});

var Worlds = mongolib.model('Worlds', {
    worldname: String,
    foldername: String,
    size: String,
    hash: String
});

var Servertypes = mongolib.model('Servertypes', {
    typename: String,
    plugins: [],
    worlds: [],
    minfree: Number,
    csc: String
});