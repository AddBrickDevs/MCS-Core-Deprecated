module.exports = {
    init: (function() {
        var self = this;
        self.hookcb = function() {
            console.log("Standard hook! When this appears, create an issue on github!");
        };
        Object.prototype.hook = self.hook;
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