var fs = require('fs');

var log = require('./classes/log.js');
var Config = require('./classes/config.js');
var version = require('./package.json').version;
var Webserver = require('./classes/webserver.js');
var Cloudserver = require('./classes/cloudlistener.js');
var Mongo = require('./classes/mongo.js');
//var MongoClient = new Mongo(Config.getMongoHost(), Config.getMongoDatabase(), Config.getMongoPort(), (Config.getMongoUser() == "" ? undefined : Config.getMongoUser()), (Config.getMongoPassword() == "" ? undefined : Config.getMongoPassword()));

//MongoClient.connect();

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

process.on("SIGINT", function() {
    log.info("System shutting down...");
    Config.save(function() {
        process.exit(0);
    });
});