"use strict";
var common_1 = require('@angular/common');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var mcs_app_1 = require('./app/mcs-app');
var ng2_translate_1 = require("ng2-translate/ng2-translate");
// enableProdMode()
platform_browser_dynamic_1.bootstrap(mcs_app_1.MCSApp, [
    http_1.HTTP_PROVIDERS,
    router_1.ROUTER_PROVIDERS,
    core_1.provide(ng2_translate_1.TranslateLoader, {
        useFactory: function (http) { return new ng2_translate_1.TranslateStaticLoader(http, 'lang', '.json'); },
        deps: [http_1.Http]
    }),
    ng2_translate_1.TranslateService,
    core_1.provide(common_1.APP_BASE_HREF, { useValue: '/' })
]).catch(function (err) { return console.error(err); });
