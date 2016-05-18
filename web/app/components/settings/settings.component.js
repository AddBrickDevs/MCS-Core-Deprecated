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
var core_1 = require('@angular/core');
var socket_service_1 = require("../../services/socket.service");
var ng2_translate_1 = require("ng2-translate/ng2-translate");
var user_service_1 = require("../../services/user.service");
var SettingsComponent = (function () {
    function SettingsComponent(_userService, _socketService) {
        var _this = this;
        this._userService = _userService;
        this._socketService = _socketService;
        this.users = [];
        this.version = "v0.0.1 PRE ALPHA";
        this.debugMode = false;
        this.sslEnabled = false;
        this.maintenanceMode = false;
        this.socket = this._socketService.getSocket();
        this.socket.on('users-res', function (data) {
            _this.users = data;
        });
        this.socket.emit('file-req', { type: "users" });
        this.socket.on("add-res");
        this.socket.emit("settings-req", { type: "debugmode" });
        this.socket.emit("settings-req", { type: "maintenancemode" });
        this.socket.emit("settings-req", { type: "ssl" });
        this.socket.on('settings-res', function (data) {
            switch (data.type) {
                case "debugmode":
                    this.debugMode = data.value;
                    break;
                case "maintenancemode":
                    this.maintenanceMode = data.value;
                    break;
                case "ssl":
                    this.sslEnabled = data.value;
                    break;
            }
        });
        this.socket.on("change-settings-res", function (data) {
            switch (data.type) {
                case "debugmode":
                    this.debugMode = data.value;
                    break;
                case "maintenancemode":
                    this.maintenanceMode = data.value;
                    break;
                case "ssl":
                    this.sslEnabled = data.value;
                    break;
            }
        });
    }
    // add_user() {
    //     this.socket.emit('add-req', {
    //         type: "user",
    //         name: this.username,
    //         password: this.password,
    //         rang: this.rang
    //     });
    // };
    SettingsComponent.prototype.toggleDebugMode = function () {
        this.socket.emit("change-settings-req", { type: "debugmode", value: !this.debugMode });
    };
    SettingsComponent.prototype.toggleMaintenanceMode = function () {
        this.socket.emit("change-settings-req", { type: "maintenancemode", value: !this.maintenanceMode });
    };
    SettingsComponent.prototype.toggleSSL = function () {
        this.socket.emit("change-settings-req", { type: "ssl", value: !this.sslEnabled });
    };
    SettingsComponent = __decorate([
        core_1.Component({
            selector: 'settings',
            templateUrl: 'app/components/settings/settings.component.html',
            providers: [],
            directives: [],
            pipes: [ng2_translate_1.TranslatePipe]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, socket_service_1.SocketService])
    ], SettingsComponent);
    return SettingsComponent;
}());
exports.SettingsComponent = SettingsComponent;
