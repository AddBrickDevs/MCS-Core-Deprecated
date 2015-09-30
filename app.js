var fs = require('fs');

var log = require('./classes/log.js');
var Config = require('./classes/config.js');
var version = require('./package.json').version;
var Webserver = require('./classes/webserver.js');
var Cloudserver = require('./classes/cloudlistener.js');
var MySQL = require('MySQL');
//var mysqlclient = new MySQL(Config.getMySQLHost(), Config.getMySQLUser(), Config.getMySQLPassword(), Config.getMySQLDatabase(), Config.getMySQLPoolSize());

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

Cloudserver.startServer(function(port){
    log.info('Cloudserver listening on port ' + port);
});
Hook.hook('onCloudserverStart');