module.exports = {
    init: (function() {
        var self = this;
        self.hookcb = function() {
            console.log("Standard hook! When this appears, create an issue on github!");
        };
    }).bind(this),
    hook: (function(hookName) {
        var self = this;
        self.hookcb(hookName);
    }).bind(this),
    setHookCallback: (function(cb) {
        var self = this;
        self.hookcb = cb;
    }).bind(this)
};