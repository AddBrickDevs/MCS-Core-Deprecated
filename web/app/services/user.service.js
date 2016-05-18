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
var ng2_cookies_1 = require("ng2-cookies/ng2-cookies");
var socket_service_1 = require("./socket.service");
var dataresult_1 = require("../utils/dataresult");
var UserService = (function () {
    function UserService(_socketService) {
        this._socketService = _socketService;
        this.loggedIn = false;
        this.socket = _socketService.getSocket();
    }
    UserService.prototype.isLoggedIn = function () {
        return this.loggedIn;
    };
    UserService.prototype.logIn = function (username, password, stay, result) {
        if (!this.loggedIn) {
            this.socket.emit("login-req", { username: this.username, password: this.password });
            this._socketService.getSocket().on("login-res", function (data) {
                if (data.reason == "success") {
                    this.loggedIn = true;
                    this.username = username;
                    this.password = password;
                    if (stay) {
                        ng2_cookies_1.Cookie.set("username", this.username);
                        ng2_cookies_1.Cookie.set("session", data.session);
                    }
                    result(dataresult_1.DataResult.Success, null);
                }
                else {
                    result(dataresult_1.DataResult.Error, data.error);
                }
            });
        }
        else {
            result(dataresult_1.DataResult.Error, "already-logged-in");
        }
    };
    UserService.prototype.registerUser = function (username, password, result) {
        this.socket.emit("setup-req", { username: username, password: password });
        this.socket.on("setup-res", function (data) {
            if (data.reason == "success") {
                result(dataresult_1.DataResult.Success, null);
            }
        });
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [socket_service_1.SocketService])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
