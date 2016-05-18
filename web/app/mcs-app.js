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
var router_1 = require('@angular/router');
var dashboard_1 = require("./components/dashboard/dashboard");
var daemons_1 = require("./components/daemons/daemons");
var plugins_1 = require("./components/plugins/plugins");
var worlds_1 = require("./components/worlds/worlds");
var servertypes_1 = require("./components/servertypes/servertypes");
var statistics_1 = require("./components/statistics/statistics");
var settings_1 = require("./components/settings/settings");
var ng2_translate_1 = require("ng2-translate/ng2-translate");
var add_1 = require("./components/daemons/add/add");
var user_service_ts_1 = require("./services/user.service.ts");
var login_component_1 = require("./components/login/login.component");
var socket_service_1 = require("./services/socket.service");
var MCSApp = (function () {
    function MCSApp(_translateService, router, _loginService) {
        this._translateService = _translateService;
        this.router = router;
        this._loginService = _loginService;
        _translateService.setDefaultLang('en_US');
        _translateService.use('en_US');
        socket_service_1.SocketService.getInstance();
        if (!this.router.serializeUrl(this.router.urlTree)) {
            this.router.navigateByUrl("/dashboard");
        }
    }
    MCSApp.prototype.isActive = function (str) {
        if (this.router.serializeUrl(this.router.urlTree).split("/")[1] === str)
            return true;
        return false;
    };
    MCSApp = __decorate([
        core_1.Component({
            selector: 'mcs-app',
            providers: [],
            bindings: [ng2_translate_1.TranslateService],
            pipes: [ng2_translate_1.TranslatePipe],
            directives: [router_1.ROUTER_DIRECTIVES],
            templateUrl: 'app/mcs-app.html',
        }),
        router_1.Routes([
            { path: '/dashboard', component: dashboard_1.Dashboard },
            { path: '/daemons', component: daemons_1.DaemonsComponent },
            { path: '/daemons/add', component: add_1.DaemonAddComponent },
            { path: '/plugins', component: plugins_1.Plugins },
            { path: '/worlds', component: worlds_1.Worlds },
            { path: '/servertypes', component: servertypes_1.ServerTypes },
            { path: '/statistics', component: statistics_1.Statistics },
            { path: '/settings', component: settings_1.Settings },
            { path: '/login', component: login_component_1.LoginComponent }
        ]), 
        __metadata('design:paramtypes', [ng2_translate_1.TranslateService, router_1.Router, user_service_ts_1.UserService])
    ], MCSApp);
    return MCSApp;
}());
exports.MCSApp = MCSApp;
