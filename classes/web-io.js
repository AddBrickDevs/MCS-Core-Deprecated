var Webserver = require('./webserver.js');
var log = require('./log.js');
var version = require('../package.json').version;
var crypto = require('crypto');

var Daemon = require('./database/daemon.js');
var Plugin = require('./database/plugin.js');
var World = require('./database/world.js');
var Servertype = require('./database/servertype.js');

var io = require('socket.io')(Webserver.getInstance({}).getWebserver());

io.on('connection', function(socket) {
    socket.on('req-file', function(data) {
        if(data.type === 'log') {
            socket.emit('log-req', log.getLog());
        } else if(data.type === "daemons") {
            socket.emit('daemons-req', Daemon.prototype.getDaemons());
        } else if(data.type === "plugins") {
            socket.emit('plugins-req', Plugin.prototype.getPlugins());
        } else if(data.type === "worlds") {
            socket.emit('worlds-req', World.prototype.getWorlds());
        } else if(data.type === "servertypes") {
            socket.emit('servertypes-req', Servertype.prototype.getServertypes());
        }
    });

    socket.on('req-info', function(data) {
        if(data.type === 'version') {
            socket.emit('version-req', {version_val: 'v' + version});
        } else if(data.type === 'startDate') {
            socket.emit('startDate-req', {date_val: Webserver.getInstance({}).getStartDate()});
        }
    });

    socket.on('add', function(data) {
        if(data.type === "daemon") {
            var newDaemon = new Daemon(data.name, data.ip, data.minport, data.maxport);
            newDaemon.save();

            Daemon.prototype.loadDaemons();
        } else if(data.type === "plugin") {
            var newPlugin = new Plugin(data.name, data.version, data.size, data.hash);
            newPlugin.save();

            Plugin.prototype.loadPlugins();
        } else if(data.type === "world") {
            /*var newWorld = new World(...);
             newWorld.save();

            World.prototype.loadWorlds();*/
        } else if(data.type === "servertype") {

        } else {
            log.warn("Unknown type to add!");
        }
    });
});