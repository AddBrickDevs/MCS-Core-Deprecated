var fs = require('fs');

var log = require('./classes/log.js');
var Config = require('./classes/config.js');
var version = require('./package.json').version;
var Webserver = require('./classes/webserver.js');
var Cloudserver = require('./classes/cloudlistener.js');
var Mongo = require('./classes/mongo.js');
var MongoClient = new Mongo(Config.getMongoHost(), Config.getMongoDatabase(), Config.getMongoPort(), (Config.getMongoUser() == "" ? undefined : Config.getMongoUser()), (Config.getMongoPassword() == "" ? undefined : Config.getMongoPassword()));

MongoClient.connect();

var Daemon = require('./classes/database/daemon.js');
Daemon.prototype.loadDaemons();

Mongo.getUserModel().count({ username: "default" }, function(err, count) {
    if(!err) {
        if(count <= 0) {
            var User = require('./classes/database/user.js');
            var defaultUser = new User("default", "ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f", "", "admin", false, 0);
            defaultUser.save();

            log.info("Added user 'default' with password 'abc'. Login to your Webinterface!");
        }
    }
});

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