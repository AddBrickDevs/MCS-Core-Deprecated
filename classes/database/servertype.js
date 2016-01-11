/**
 *  Servertype object
 *  @module classes/database/servertype
 */

/**
 * Constructs the servertype object
 * @param name The name
 * @param plugins The plugins
 * @param worlds The worlds
 * @param minfree The minimum amount of servers with this servertype
 * @param csc Custom start command
 * @constructor Servertype
 */
var Servertype = function(name, plugins, worlds, minfree, csc) {
    this.name = name;
    this.plugins = plugins;
    this.worlds = worlds;
    this.minfree = minfree;
    this.csc = csc;
};

Servertype.prototype.getName = function() {
    return this.name;
};

Servertype.prototype.setName = function(value) {
    this.name = value;
};

Servertype.prototype.getPlugins = function() {
    return this.plugins;
};

Servertype.prototype.setPlugins = function(value) {
    this.plugins = value;
};

Servertype.prototype.getWorlds = function() {
    return this.worlds;
};

Servertype.prototype.setWorlds = function(value) {
    this.worlds = value;
};

Servertype.prototype.getMinFree = function() {
    return this.minfree;
};

Servertype.prototype.setMinFree = function(value) {
    this.minfree = value;
};

Servertype.prototype.getCustomServerCommand = function() {
    return this.csc;
};

Servertype.prototype.setCustomServerCommand = function(value) {
    this.csc = value;
};

Servertype.prototype.toJSON = function() {
    return {
        name: this.getName(),
        plugins: this.getPlugins().getJSON(),
        worlds: this.getWorlds().toJSON(),
        minfree: this.getMinFree(),
        csc: this.getCustomServerCommand()
    };
};

Servertype.prototype.save = function() {

};

module.exports = Servertype;