import {Component} from "@angular/core";
import {TranslatePipe} from "ng2-translate/ng2-translate";
import {UserService} from "../../services/user.service";
import {NotificationService} from "../../services/notification.service";
import {Router} from "@angular/router";
import {SocketService} from "../../services/socket.service";
import {Cookie} from "ng2-cookies/ng2-cookies"

@Component({
    selector: 'login',
    providers: [],
    bindings : [],
    pipes : [TranslatePipe],
    directives: [],
    templateUrl: 'app/components/login/login.component.html',
})
export class LoginComponent {

    public username:string;
    public password:string;
    public stay:boolean;

    constructor(private _userService:UserService, private _notificationService:NotificationService, private _socketService:SocketService, private router:Router) {}

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

        if(!this._userService.isLoggedIn()) {
            this._socketService.getSocket().emit("login-req", {username: this.username, password: this.password});
            this._socketService.getSocket().on("login-res", (data) => {
                if(data.reason == "success") {
                    if(this.stay) {
                        Cookie.set("username", this.username);
                        Cookie.set("session", data.session);
                    }
                    this._userService.logIn(this.username, this.password);
                    this.router.navigateByUrl("/dashboard");
                } else {
                    this._notificationService.sendMessage(data.error, true);
                }
            });
        }
    }

}