var log = require('./classes/log.js');
var version = require('./package.json').version;
var Webserver = require('./classes/webserver.js');
var Cloudserver = require('./classes/cloudlistener.js');

log.handleuncaughtExceptions();

log.info('MCS v'+version+' starting...');
log.info('\   /\\', true);
log.info('\  |  |', true);
log.info('\  |  |', true);
log.info('\ /|/\\|\\', true);
log.info('/_||||_\\', true);
log.info('\  /||\\', true);

Webserver.getInstance({}).start();
Cloudserver.startServer(function(port){
    log.info('Cloudserver listening on port '+port);
});