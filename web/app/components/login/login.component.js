"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var ng2_translate_1 = require("ng2-translate/ng2-translate");
var user_service_1 = require("../../services/user.service");
var notification_service_1 = require("../../services/notification.service");
var router_1 = require("@angular/router");
var socket_service_1 = require("../../services/socket.service");
var ng2_cookies_1 = require("ng2-cookies/ng2-cookies");
var LoginComponent = (function () {
    function LoginComponent(_userService, _notificationService, _socketService, router) {
        this._userService = _userService;
        this._notificationService = _notificationService;
        this._socketService = _socketService;
        this.router = router;
    }
    LoginComponent.prototype.login = function () {
        var _this = this;
        if (!this.username || !this.password) {
            if (!this.username && !this.password) {
                return;
            }
            if (!this.username) {
                return;
            }
            if (!this.password) {
                return;
            }
        }
        if (!this._userService.isLoggedIn()) {
            this._socketService.getSocket().emit("login-req", { username: this.username, password: this.password });
            this._socketService.getSocket().on("login-res", function (data) {
                if (data.reason == "success") {
                    if (_this.stay) {
                        ng2_cookies_1.Cookie.set("username", _this.username);
                        ng2_cookies_1.Cookie.set("session", data.session);
                    }
                    _this._userService.logIn(_this.username, _this.password);
                    _this.router.navigateByUrl("/dashboard");
                }
                else {
                    _this._notificationService.sendMessage(data.error, true);
                }
            });
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            providers: [],
            bindings: [],
            pipes: [ng2_translate_1.TranslatePipe],
            directives: [],
            templateUrl: 'app/components/login/login.component.html',
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, notification_service_1.NotificationService, socket_service_1.SocketService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
