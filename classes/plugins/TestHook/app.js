var API = require('../../loader.js');

module.exports = {
    onWebserverStart: function() {
        API.log.info("OMFG! Webserver started ^^");
    }
};