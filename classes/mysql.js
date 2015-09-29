/**
 *  Helper class for MySQL
 *  @module classes/mysql
 */

var mysqllib = require('mysql');
var log = require('./log.js');
var queries = [
    "CREATE TABLE IF NOT EXISTS `Users` (username PRIMARYKEY VARCHAR(22), password VARCHAR(128), twofa VARCHAR(16))", //Password = SHA 512
    "CREATE TABLE IF NOT EXISTS `Daemons` (daemonname PRIMARYKEY VARCHAR(22), daemonip VARCHAR(16), minport INT(5), maxport INT(5), apikey VARCHAR(16))",
    "CREATE TABLE IF NOT EXISTS `Plugins` (pluginname PRIMARYKEY VARCHAR(32), version VARCHAR(100))", //32 Chars should be enough
    "CREATE TABLE IF NOT EXISTS `Servertypes` (servertype PRIMARYKEY VARCHAR(22), plugins TEXT, worlds TEXT)",
    "CREATE TABLE IF NOT EXISTS `Worlds` (worldname PRIMARYKEY VARCHAR(32), foldername TEXT)"
];

module.exports = MySQL;

/**
 * Creates a mysql instance
 * @param host The mysql host
 * @param username The username
 * @param password The password
 * @param database The database
 * @param poolSize The size of the pool
 */
function MySQL(host, username, password, database, poolSize) {
    this.host = host;
    this.username = username;
    this.password = password;
    this.database = database;
    this.poolSize = poolSize;
}

/**
 * Connects to the database
 */
MySQL.prototype.connect = function() {
    this.db = mysqllib.createPool({
        connectionLimit: this.poolSize,
        host: this.host,
        user: this.user,
        password: this.password,
        database: this.database
    });
    this.db.getConnection(function(error) {
       if(error) {
           throw new SQLException(error);
       }
    });
    queries.forEach(function(query){
        this.db.query(query, function(err){
            if(err){log.error(err)}
        });
    })
};

/**
 * Executes a query to the database
 * @param query The query
 * @param cb The callback
 */
MySQL.prototype.query = function(query, cb) {
    this.db.query(query, function(err, rows) {
        if(err) {
            log.error(err);
        }
        if(cb){cb(rows);}
    });
};

/**
 * Adds a Query to the startqueries
 * @param query Startquery
 */
MySQL.prototype.addStartQuery = function(query) {
    queries.push(query);
};