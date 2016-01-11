/**
 *  World object
 *  @module classes/database/world
 */

var World = function(name, folder, size, hash) {
    this.name = name;
    this.folder = folder;
    this.size = size;
    this.hash = hash;
};

/**
 * Gets the name of the world
 * @returns {*}
 */
World.prototype.getName = function() {
    return this.name;
};

/**
 * Sets the name of the world
 * @param value The name
 */
World.prototype.setName = function(value) {
    this.name = value;
};

/**
 * Gets the folder of the world
 * @returns {*}
 */
World.prototype.getFolder = function() {
    return this.folder
};

/**
 * Sets the folder of the world
 * @param value The name
 */
World.prototype.setFolder = function(value) {
    this.folder = value;
};

/**
 * Gets the size of the world
 * @returns {*}
 */
World.prototype.getSize = function() {
    return this.size;
};

/**
 * Sets the size of the world
 * @param value The size
 */
World.prototype.setSize = function(value) {
    this.size = value;
};

/**
 * Gets the sha1 hash of the world
 * @returns {*}
 */
World.prototype.getHash = function() {
    return this.hash;
};

/**
 * Sets the sha1 hash of the world
 * @param value The sha1 hash
 */
World.prototype.setHash = function(value) {
    this.hash = value;
};

World.prototype.toJSON = function() {
    return {
        name: this.getName(),
        size: this.getSize(),
        hash: this.getHash()
    };
};

World.prototype.save = function(){

};

module.exports = World;