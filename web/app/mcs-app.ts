import {Component} from '@angular/core';
import {Router, Routes, ROUTER_DIRECTIVES} from '@angular/router';
import {Dashboard} from "./components/dashboard/dashboard";
import {DaemonsComponent} from "./components/daemons/daemons";
import {Plugins} from "./components/plugins/plugins";
import {Worlds} from "./components/worlds/worlds";
import {ServerTypes} from "./components/servertypes/servertypes";
import {Statistics} from "./components/statistics/statistics";
import {Settings} from "./components/settings/settings";
import {TranslatePipe, TranslateService} from "ng2-translate/ng2-translate";
import {DaemonAddComponent} from "./components/daemons/add/add";
import {UserService} from "./services/user.service.ts";
import {LoginComponent} from "./components/login/login.component";
import {SocketService} from "./services/socket.service";

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
    { path: '/daemons',          component: DaemonsComponent },
    { path: '/daemons/add',      component: DaemonAddComponent},
    { path: '/plugins',          component: Plugins },
    { path: '/worlds',           component: Worlds },
    { path: '/servertypes',      component: ServerTypes },
    { path: '/statistics',       component: Statistics },
    { path: '/settings',         component: Settings },
    { path: '/login',            component: LoginComponent }
])
export class MCSApp {

    constructor(private _translateService:TranslateService, private router:Router, public _loginService:UserService) {
        _translateService.setDefaultLang('en_US');
        _translateService.use('en_US');

        SocketService.getInstance();

        if(!this.router.serializeUrl(this.router.urlTree)) {
            this.router.navigateByUrl("/dashboard");
        }
    }

    isActive(str:String) {
        if(this.router.serializeUrl(this.router.urlTree).split("/")[1] === str) return true;

        return false;
    }

}

