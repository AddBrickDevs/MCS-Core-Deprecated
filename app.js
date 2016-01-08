var fs = require('fs');

var log = require('./classes/log.js');
var Config = require('./classes/config.js');
var version = require('./package.json').version;
var Webserver = require('./classes/webserver.js');
var Cloudserver = require('./classes/cloudlistener.js');
var DataManager = require('./classes/database/datamanager.js');
var MySQL = require('./classes/mysql.js');
var Mongo = require('./classes/mongo.js');
log.debug(Config.getMySQLHost());
log.debug(Config.getMySQLUser());
log.debug(Config.getMySQLPassword());
log.debug(Config.getMySQLDatabase());
log.debug(Config.getMySQLPoolSize());
var MySQLClient = new MySQL(Config.getMySQLHost(), Config.getMySQLUser(), Config.getMySQLPassword(), Config.getMySQLDatabase(), Config.getMySQLPoolSize());
var MongoClient = new Mongo("localhost", "mcs");

if(Config.getDBType() == "mongodb") {
    log.info("Connecting to MongoDB...");
    MongoClient.connect();
} else if(Config.getDBType() == "mysql") {
    log.info("Connecting to MySQL...");
    MySQLClient.connect();
} else {
    log.warn("Unknown Database-Type. Shutting down...");
    process.exit(1);
}

var Injector = require('./classes/injector/inject.js');
var Hook = require('./classes/injector/hook.js');

// Plugin system magic ^^
Hook.init();
Injector.initialize('./classes/plugins');

log.handleuncaughtExceptions();

log.info('MCS v' + version + ' starting...');
log.info('\   /\\', true);
log.info('\  |  |', true);
log.info('\  |  |', true);
log.info('\ /|/\\|\\', true);
log.info('/_||||_\\', true);
log.info('\  /||\\', true);
log.info('Ready to take off...', true);

try {
    fs.mkdirSync('./classes/plugins/');
} catch(e) {
    if(e.code !== 'EEXIST') throw e;
}

Webserver.getInstance({}).start();
Hook.hook('onWebserverStart');

var WebIO = require('./classes/web-io.js');

Cloudserver.startServer(function(port){
    log.info('Cloudserver listening on port ' + port);
});
Hook.hook('onCloudserverStart');