var Webserver = require('./webserver.js');
var Config = require('./config.js');
var log = require('./log.js');
var version = require('../package.json').version;
var crypto = require('crypto');

var Daemon = require('./database/daemon.js');
var Plugin = require('./database/plugin.js');
var World = require('./database/world.js');
var Servertype = require('./database/servertype.js');
var User = require("./database/user.js");

var mongoClient = require("./mongo.js");

var io = require('socket.io')(Webserver.getInstance().getWebserver());

io.on('connection', function(socket) {

    socket.on("setup-req-req", function() {
        socket.emit("setup-req-res", { required: Config.isSetupRequired() });
    });

    socket.on("setup-req", function(data) {
        if(Config.isSetupRequired()) {
            var hash = crypto.createHash('sha512');
            hash.setEncoding('hex');
            hash.write(data.password);
            hash.end();

            new User(data.username, hash.read(), "", "admin", "nein", 0).save(function(err) {
                if(!err) {
                    socket.emit("setup-res", { reason: "success", done: false });
                    Config.setSetupFinished();
                    io.sockets.emit("forward", { url: "/login" });
                } else {
                    socket.emit("setup-res", { reason: "failure", done: false });
                }
            });
        } else {
            log.debug("setup isn't required");
            socket.emit("setup-res", { reason: "failure", done: true });
        }
    });

    socket.on("clogin-req", function(data) {
        mongoClient.getUserModel().findOne({ username: data.username }, function(err, user) {
            if(!err) {
                if(user.lastSID === data.session) {
                    loadListener();
                    socket.emit("clogin-res", { reason: "success" });
                } else {
                    socket.emit("clogin-res", { reason: "failure" });
                }
            } else {
                socket.emit("clogin-res", { reason: "failure" });
            }
        });
    });

    socket.on("login-req", function(data) {
        var hash = crypto.createHash('sha512');
        hash.setEncoding('hex');
        hash.write(data.password);
        hash.end();

        mongoClient.getUserModel().findOne({ username: data.username }, function(err, user) {
            if(!err) {
                if(user == undefined) {
                    socket.emit("login-res", { reason: "failed", error: "no-such-user" });
                    return;
                }
                if(user.username === data.username && user.password === hash.read()) {
                    loadListener();
                    var cookie = crypto.randomBytes(8).toString('hex');

                    mongoClient.getUserModel().update({ username: data.username }, { $set: { lastSID: cookie } }).exec();
                    socket.emit("login-res", { reason: "success", session: cookie });
                } else {
                    socket.emit("login-res", { reason: "failed", error: "no-such-user" });
                }
            } else {
                socket.emit("login-res", { reason: "failed", error: "database-error" });
            }
        });
    });

    var loadListener = function() {
        socket.on('file-req', function(data) {
            if(data.type === 'log') {
                socket.emit('log-res', log.getLog());
            } else if(data.type === "daemons") {
                Daemon.prototype.getDaemons(function(daemons) {
                    socket.emit('daemons-res', daemons);
                });
            } else if(data.type === "plugins") {
                // TODO
            } else if(data.type === "worlds") {
                // TODO
            } else if(data.type === "servertypes") {
                // TODO
            }
        });

        socket.on('info-req', function(data) {
            if(data.type === 'version') {
                socket.emit('version-res', {version_val: 'v' + version});
            } else if(data.type === 'startDate') {
                socket.emit('startDate-res', {date_val: Webserver.getInstance({}).getStartDate()});
            }
        });

        socket.on('add-req', function(data) {
            if(data.type === "daemon") {
                var newDaemon = new Daemon(data.name, data.ip, data.minport, data.maxport, false).save(function(success) {
                    socket.emit('add-res', { success: success});
                    Daemon.prototype.getDaemons(function(daemons) {
                        io.sockets.emit('daemons-res', daemons);
                    });
                });
            } else if(data.type === "plugin") {
                // TODO
            } else if(data.type === "world") {
                // TODO
            } else if(data.type === "servertype") {
                // TODO
            } else {
                log.warn("Unknown type to add!");
            }
        });

        socket.on('daemon-req', function(data) {
            mongoClient.getDaemonModel().findById(data.id, function(err, daemon) {
                if(!err) {
                    if(daemon == undefined) {
                        socket.emit("daemon-res", { reason: "failed", error: "no-such-daemon" });
                        return;
                    }
                    socket.emit("daemon-res", { reason: "success", daemon: daemon });
                } else {
                    socket.emit("daemon-res", { reason: "failed", error: "database-error" });
                }
            });
        });

        socket.on('del-req', function(data) {
            if(data.type === "daemon") {
                mongoClient.getDaemonModel().remove({ _id: data.id }).exec();

                Daemon.prototype.getDaemons(function(daemons) {
                    io.sockets.emit('daemons-res', daemons);
                });
            }
        });

        socket.on("settings-req", function(data) {
            switch(data.type) {
                case "debugmode":
                    socket.emit("settings-res", { type: "debugmode", value: Config.isDebugMode() });
                    break;
                case "maintenancemode":
                    socket.emit("settings-res", { type: "maintenancemode", value: Config.isMaintenanceMode() });
                    break;
                case "ssl":
                    socket.emit("settings-res", { type: "ssl", value: Config.isHTTPSEnabled() });
                    break;
            }
        });

        socket.on("change-settings-req", function(data) {
            switch(data.type) {
                case "debugmode":
                    Config.setDebugMode(data.value);
                    io.sockets.emit("change-settings-res", { type: "debugmode", value: data.value });
                    break;
                case "maintenancemode":
                    Config.setMaintenanceMode(data.value);
                    io.sockets.emit("change-settings-res", { type: "maintenancemode", value: data.value });
                    break;
                case "ssl":
                    Config.setHTTPSEnabled(data.value);
                    io.sockets.emit("change-settings-res", { type: "ssl", value: data.value });
                    break;
            }
        });
    };
});