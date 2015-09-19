var fs = require('fs');
var path = require('path');

var log = require('../log.js');
var hook = require('./hook.js');

var plugins = [];

exports.initialize = function(srcPath) {
    hook.setHookCallback(function(hookName) {
        for(var plugin of plugins) {
            if(plugin.hasOwnProperty(hookName)) {
                plugin[hookName]();
            }
        }
    });
    searchForPlugins(srcPath);
};

var searchForPlugins = function(srcPath) {
    var files = fs.readdirSync(srcPath);
    for(var dir of files) {
        var files2 = fs.readdirSync(path.join(srcPath, dir));
        if(files2.indexOf("plugin.json") != -1) {
            var content = fs.readFileSync(path.join(srcPath, dir, "plugin.json"));
            var json = JSON.parse(content);
            if(files2.indexOf("app.js") != -1) {
                plugins.push(require('../plugins/' +  dir + '/app.js'));
                log.info("Enabled plugin " + json.name);
            }
        }
    }
};