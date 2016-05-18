import {Component} from "@angular/core";
import {TranslatePipe} from "ng2-translate/ng2-translate";
import {UserService} from "../../services/user.service.ts";
import {NotificationService} from "../../services/notification.service";
import {DataResult} from "../../utils/dataresult";
import {Router} from "@angular/router";

@Component({
    selector: 'login',
    providers: [],
    bindings : [],
    pipes : [TranslatePipe],
    directives: [],
    templateUrl: 'app/components/login/login.component.html',
})
export class LoginComponent {

    public username:String;
    public password:String;
    public stay:Boolean;

    constructor(private _loginService:UserService, private _notificationService:NotificationService, private router:Router) {}

    login() {
        if(!this.username || !this.password) {
            if(!this.username && !this.password) {
                return;
            }
            if(!this.username) {
                return;
            }
            if(!this.password) {
                return;
            }
        }

        this._loginService.logIn(this.username, this.password, this.stay, function (loginResult, error) {
            if(loginResult == DataResult.Success) {
                this.router.navigateByUrl("/dashboard");
            } else if(loginResult == DataResult.Error) {
                this._notificationService.sendMessage(error, true);
            }
        });
    }

}