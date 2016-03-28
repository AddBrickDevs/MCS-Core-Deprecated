var JSZip = require('jszip');
var YAML = require('yamljs');
var crypto = require('crypto');
var log = require('./log.js');
var fs = require('fs');
var path = require('path');

var Plugin = require('./database/plugin.js');
var World = require('./database/world.js');

exports.pluginFromReq = function (req, res, cb) {
    var file = req.files.file;
    console.log(file.path);
    fs.readFile(file.path, function read(err, data) {
        if (err) {
            throw err;
        }

        try {
            var zip = new JSZip(data);
            var info = YAML.parse(zip.file('plugin.yml').asText());
            if (!fs.existsSync('./plugins')) {
                fs.mkdirSync('./plugins');
            }
            if (fs.existsSync('./plugins/' + info.name + '.jar')) {
                fs.unlinkSync('./plugins/' + info.name + '.jar');
            }
            fs.writeFileSync('./plugins/' + info.name + '.jar', data, 'binary');
            // TODO Send to daemons
            var hash = crypto.createHash('sha1');
            hash.setEncoding('hex');
            hash.write(data);
            hash.end();

            var plugin = new Plugin(info.name, info.version, Math.round(fs.statSync('./plugins/' + info.name + '.jar')['size'] / 1024), hash.read());
            cb(plugin);
        } catch (e) {
            log.error('Plugin upload error: ' + e);
        }
    });
};

exports.worldFromReq = function (req, res, cb) {
    var file = req.files.file;
    try {
        fs.readFile(file.path, function (err, data) {
            if (err) {
                throw err;
            }
            var zip = new JSZip(data);
            fs.mkdirSync("./worlds/");
            fs.mkdirSync("./worlds/" + file.name.replace(".zip", ""));
            Object.keys(zip.files).forEach(function (filename) {
                var content = zip.files[filename].asNodeBuffer();
                var dest = path.join("./worlds/" + file.name.replace(".zip", ""), filename);
                if(!fs.existsSync(path.dirname(dest))) {
                    fs.mkdirSync(path.dirname(dest));
                }
                fs.writeFileSync(dest, content);
            });
            // TODO Send to daemons
            var hash = crypto.createHash('sha1');
            hash.setEncoding('hex');
            fs.readFile(file.path, function (err, data) {
                hash.write(data);
                hash.end();

                var world = new World(file.name.replace(".zip", ""),
                    "./worlds/" + file.name.replace(".zip", ""),
                    Math.round(fs.statSync(file.path)['size'] / 1024,
                    hash.read()));
                cb(world);
            });
        });
    } catch (e) {
        log.error(e);
    }
};