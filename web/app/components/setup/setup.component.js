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
var socket_service_1 = require("../../services/socket.service");
var router_1 = require("@angular/router");
var SetupComponent = (function () {
    function SetupComponent(_userService, _socketService, router) {
        this._userService = _userService;
        this._socketService = _socketService;
        this.router = router;
        this.setupRequired = true;
    }
    SetupComponent.prototype.setup = function () {
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
            this._socketService.getSocket().emit("setup-req", { username: this.username, password: this.password });
            this._socketService.getSocket().on("setup-res", function (data) {
                if (data.reason == "success") {
                    _this.router.navigateByUrl("/login");
                }
            });
        }
    };
    SetupComponent = __decorate([
        core_1.Component({
            selector: 'setup',
            providers: [],
            bindings: [],
            pipes: [ng2_translate_1.TranslatePipe],
            directives: [],
            templateUrl: 'app/components/setup/setup.component.html',
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, socket_service_1.SocketService, router_1.Router])
    ], SetupComponent);
    return SetupComponent;
}());
exports.SetupComponent = SetupComponent;
