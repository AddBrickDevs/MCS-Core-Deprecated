var Daemon = require('./daemon.js');
var Plugin = require('./plugin.js');
var Servertype = require('./servertype.js');
var User = require('./user.js');
var World = require('./world.js');

var daemons = [];
var plugins = [];
var servertypes = [];
var users = [];
var worlds = [];

exports.getDaemons = function() {
    return daemons;
};

exports.getPlugins = function() {
    return plugins;
};

exports.getServerTypes = function() {
    return servertypes;
};

exports.getUsers = function() {
    return users;
};

exports.getWorlds = function() {
    return worlds;
};