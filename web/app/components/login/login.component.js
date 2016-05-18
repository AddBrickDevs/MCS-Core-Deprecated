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
var user_service_ts_1 = require("../../services/user.service.ts");
var notification_service_1 = require("../../services/notification.service");
var dataresult_1 = require("../../utils/dataresult");
var router_1 = require("@angular/router");
var LoginComponent = (function () {
    function LoginComponent(_loginService, _notificationService, router) {
        this._loginService = _loginService;
        this._notificationService = _notificationService;
        this.router = router;
    }
    LoginComponent.prototype.login = function () {
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
        this._loginService.logIn(this.username, this.password, this.stay, function (loginResult, error) {
            if (loginResult == dataresult_1.DataResult.Success) {
                this.router.navigateByUrl("/dashboard");
            }
            else if (loginResult == dataresult_1.DataResult.Error) {
                this._notificationService.sendMessage(error, true);
            }
        });
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
        __metadata('design:paramtypes', [user_service_ts_1.UserService, notification_service_1.NotificationService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
