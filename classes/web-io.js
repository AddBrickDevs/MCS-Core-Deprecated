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

var io = require('socket.io')(Webserver.getInstance({}).getWebserver());

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

            var user = new User(data.username, hash.read(), "", "admin", "nein", 0);
            user.save((err) => {
                if(err == undefined) {
                    socket.emit("setup-res", { reason: "success", done: false });
                    Config.setSetupFinished();
                    io.sockets.emit("forward", { url: "/login" });
                } else {
                    socket.emit("setup-res", { reason: "failure", done: false });
                }
            });
        } else {
            socket.emit("setup-res", { reason: "failure", done: true });
        }
    });

    socket.on("clogin-req", function(data) {
        mongoClient.getUserModel().count({ username: data.username, lastSID: data.session }, function(err, count) {
            if(!err) {
                if(count > 0) {
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
                if(user.username == data.username && user.password == hash.read()) {
                    loadListener();
                    var cookie = crypto.randomBytes(8).toString('hex');

                    mongoClient.getUserModel().update({ username: data.username }, { $set: { lastSID: cookie } }).exec();
                    socket.emit("login-res", { reason: "success", session: cookie });
                } else {
                    socket.emit("login-res", { reason: "failed" });
                }
            } else {
                socket.emit("login-res", { reason: "failed" });
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
                socket.emit('plugins-res', Plugin.prototype.getPlugins());
            } else if(data.type === "worlds") {
                //socket.emit('worlds-res', World.prototype.getWorlds());
            } else if(data.type === "servertypes") {
                //socket.emit('servertypes-res', Servertype.prototype.getServertypes());
            }
        });

        socket.on('info-req', function(data) {
            if(data.type === 'version') {
                socket.emit('version-res', {version_val: 'v' + version});
            } else if(data.type === 'startDate') {
                socket.emit('startDate-res', {date_val: Webserver.getInstance({}).getStartDate()});
            }
        });

        socket.on('add', function(data) {
            if(data.type === "daemon") {
                var newDaemon = new Daemon(data.name, data.ip, data.minport, data.maxport).save(function(success) {
                    socket.emit('add-res', { success: success});
                });
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
    };
});