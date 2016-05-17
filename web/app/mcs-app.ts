import {Component} from '@angular/core';
import {Router, Routes, ROUTER_DIRECTIVES} from '@angular/router';
import {Dashboard} from "./components/dashboard/dashboard";
import {Daemons} from "./components/daemons/daemons";
import {Plugins} from "./components/plugins/plugins";
import {Worlds} from "./components/worlds/worlds";
import {ServerTypes} from "./components/servertypes/servertypes";
import {Statistics} from "./components/statistics/statistics";
import {Settings} from "./components/settings/settings";
import {TranslatePipe, TranslateService} from "ng2-translate/ng2-translate";

// import {Home} from './components/home/home';
// import {About} from './components/about/about';
// import {RepoBrowser} from './components/repo-browser/repo-browser';

@Component({
    selector: 'mcs-app',
    providers: [],
    bindings : [TranslateService],
    pipes : [TranslatePipe],
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'app/mcs-app.html',
})
@Routes([
    { path: '/dashboard',        component: Dashboard },
    { path: '/daemons',          component: Daemons },
    { path: '/plugins',          component: Plugins },
    { path: '/worlds',           component: Worlds },
    { path: '/servertypes',      component: ServerTypes },
    { path: '/statistics',       component: Statistics },
    { path: '/settings',         component: Settings },
])
export class MCSApp {

    constructor(translate: TranslateService) {
        //todo use cookies
        translate.setDefaultLang('en_US');
        translate.use('en_US');
    }

}

