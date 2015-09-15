/**
 *  User object
 *  @module classes/database/user
 */

var User = function(username, password, rank, twofa) {
    this.username = username;
    this.password = password;
    this.rank = rank;
    if(twofa) {
        this.twofa = twofa;
    }
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

User.prototype.toJSON = function() {
    return {
        username: this.getUsername(),
        password: this.getPassword(),
        rank: this.getRank(),
        twofa: this.getTwoFA()
    };
};

module.exports = User;