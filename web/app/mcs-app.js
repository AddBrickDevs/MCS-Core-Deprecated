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
var router_1 = require("@angular/router");
var dashboard_component_1 = require("./components/dashboard/dashboard.component");
var daemons_component_1 = require("./components/daemons/daemons.component");
var plugins_component_1 = require("./components/plugins/plugins.component");
var worlds_component_1 = require("./components/worlds/worlds.component");
var servertypes_component_1 = require("./components/servertypes/servertypes.component");
var statistics_component_1 = require("./components/statistics/statistics.component");
var settings_component_1 = require("./components/settings/settings.component");
var ng2_translate_1 = require("ng2-translate/ng2-translate");
var user_service_1 = require("./services/user.service");
var login_component_1 = require("./components/login/login.component");
var setup_component_1 = require("./components/setup/setup.component");
var MCSApp = (function () {
    function MCSApp(_translateService, router, _userService) {
        this._translateService = _translateService;
        this.router = router;
        this._userService = _userService;
        _translateService.setDefaultLang('de_DE');
        _translateService.use('de_DE');
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
            { path: '/dashboard', component: dashboard_component_1.Dashboard },
            { path: '/daemons', component: daemons_component_1.DaemonsComponent },
            { path: '/plugins', component: plugins_component_1.Plugins },
            { path: '/worlds', component: worlds_component_1.WorldsComponent },
            { path: '/servertypes', component: servertypes_component_1.ServerTypesComponent },
            { path: '/statistics', component: statistics_component_1.StatisticsComponent },
            { path: '/settings', component: settings_component_1.SettingsComponent },
            { path: '/login', component: login_component_1.LoginComponent },
            { path: '/setup', component: setup_component_1.SetupComponent }
        ]), 
        __metadata('design:paramtypes', [ng2_translate_1.TranslateService, router_1.Router, user_service_1.UserService])
    ], MCSApp);
    return MCSApp;
}());
exports.MCSApp = MCSApp;
