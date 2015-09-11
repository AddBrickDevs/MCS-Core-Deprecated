/**
 *  Webserver wrapper
 *  @module classes/webserver
 */

// Core modules
var Config = require('./config.js');
var log = require('./log.js');

// Webserver
var http = require('http');
var https = require('https');
var spdy = require('spdy');
var app;

// Additionals e.g. gzip compression
var compression = require('compression');
var serve = require('serve-static')('./web/');

var instance;

/**
 * Get instance of the webserver
 * @param options Webserver options.
 * @returns {*}
 */
exports.getInstance = function(options) {
    if(options && instance === undefined) instance = new Webserver(options);
    return instance;
}

var Webserver = function(options) {
    this.app = require('express')();
    this.app.use(compression());
    this.app.use(serve);

    if(Config.isHTTPSEnabled()) {
        if (Config.isSPDYEnabled()) {
            this.webserver = spdy.createServer(options, this.app);
        } else {
            this.webserver = https.createServer(options, this.app);
        }
    } else {
        this.webserver = http.Server(this.app);
    }
};

/**
 * Gets the webserver (http, https, spdy)
 * @returns {*}
 */
Webserver.prototype.getWebserver = function() {
    return this.webserver;
}

Webserver.prototype.start = function() {
    this.webserver.listen(Config.getWebInterfacePort(), Config.getListenIP());
    log.info("Webserver started!");
}

/**
 * Gets the express app
 * @returns {*}
 */
Webserver.prototype.getExpressApp = function() {
    return this.app;
}