var Webserver = require('./webserver.js');
var log = require('./log.js');
var version = require('../package.json').version;
var crypto = require('crypto');

var Daemon = require('./database/daemon.js');

var io = require('socket.io')(Webserver.getInstance({}).getWebserver());

io.on('connection', function(socket) {
    socket.on('req-file', function(data) {
        if(data.type === 'log') {
            socket.emit('log-req', log.getLog());
        } else if(data.type === "daemons") {
            socket.emit('daemon-req', Daemon.getDaemons());
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
            if((data.name != undefined && data.name != "") && (data.ip != undefined && data.ip != "") && (data.minport != undefined || data.minport != "") && (data.maxport != undefined || data.maxport != "")) {
                var apikey = crypto.randomBytes(8).toString("hex");

                var newDaemon = new Daemon(data.name, data.ip, data.minport, data.maxport, apikey);
                newDaemon.save();
            }
        }

    });
});