/**
 *  User object
 *  @module classes/database/user
 */
var mongoClient = require('../mongo.js');

var User = function(username, password, lastSID, rank, twofa, backupcode) {
    this.username = username;
    this.password = password;
    this.lastSID = lastSID;
    this.rank = rank;
    if(twofa) {
        this.twofa = twofa;
    }
    this.backupcode = backupcode;
};

User.prototype.getUsername = function() {
    return this.username;
};

User.prototype.setUsername = function(value) {
    this.username = value;
};

User.prototype.getPassword = function() {
    return this.password;
};

User.prototype.setPassword = function(value) {
    this.password = value;
};

User.prototype.getLastSID = function() {
    return this.lastSID;
};

User.prototype.setLastSID = function(value) {
    this.lastSID = value;
};

User.prototype.getRank = function() {
    return this.rank;
};

User.prototype.setRank = function(value) {
    this.rank = value;
};

User.prototype.getTwoFA = function() {
    return this.twofa;
};

User.prototype.setTwoFA = function(value) {
    this.twofa = value;
};

User.prototype.getBackupCode = function() {
    return this.backupcode;
};

User.prototype.setBackupCode = function(value) {
    this.backupcode = value;
};

User.prototype.toJSON = function() {
    return {
        username: this.getUsername(),
        password: this.getPassword(),
        rank: this.getRank(),
        twofa: this.getTwoFA()
    };
};

User.prototype.save = function(callback){
    var UserModel = mongoClient.getUserModel();
    var newUser = new UserModel({
        username: this.getUsername(),
        password: this.getPassword(),               // Save in SHA512
        lastSID: this.getLastSID(),
        rank: this.getRank(),
        twofa: this.getTwoFA(),
        backupcode: this.getBackupCode()
    });
    newUser.save(function(err) {
        callback(err);
    });
};

module.exports = User;