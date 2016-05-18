import {Component} from "@angular/core";
import {Router, Routes, ROUTER_DIRECTIVES} from "@angular/router";
import {Dashboard} from "./components/dashboard/dashboard.component";
import {DaemonsComponent} from "./components/daemons/daemons.component";
import {Plugins} from "./components/plugins/plugins.component";
import {WorldsComponent} from "./components/worlds/worlds.component";
import {ServerTypesComponent} from "./components/servertypes/servertypes.component";
import {StatisticsComponent} from "./components/statistics/statistics.component";
import {SettingsComponent} from "./components/settings/settings.component";
import {TranslatePipe, TranslateService} from "ng2-translate/ng2-translate";
import {UserService} from "./services/user.service";
import {LoginComponent} from "./components/login/login.component";
import {SetupComponent} from "./components/setup/setup.component";

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
    { path: '/plugins',          component: Plugins },
    { path: '/worlds',           component: WorldsComponent },
    { path: '/servertypes',      component: ServerTypesComponent },
    { path: '/statistics',       component: StatisticsComponent },
    { path: '/settings',         component: SettingsComponent },
    { path: '/login',            component: LoginComponent },
    { path: '/setup',            component: SetupComponent}
])
export class MCSApp {

    constructor(private _translateService:TranslateService, private router:Router, private _userService:UserService) {
        _translateService.setDefaultLang('de_DE');
        _translateService.use('de_DE');

        if(!this.router.serializeUrl(this.router.urlTree)) {
            this.router.navigateByUrl("/dashboard");
        }
    }

    isActive(str:String) {
        if(this.router.serializeUrl(this.router.urlTree).split("/")[1] === str) return true;

        return false;
    }

}

