/**
 *  Helper class for MySQL
 *  @module classes/mysql
 */

var mysqllib = require('mysql');
var log = require('./log.js');

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
    if(poolSize) {
        this.poolSize = poolSize;
    }
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
        if(cb) cb(rows);
    });
};