import {Component} from "@angular/core"
import {TranslatePipe} from "ng2-translate/ng2-translate"
import {UserService} from "../../services/user.service";
import {SocketService} from "../../services/socket.service";
import {Router} from "@angular/router"

@Component({
    selector: 'setup',
    providers: [],
    bindings : [],
    pipes : [TranslatePipe],
    directives: [],
    templateUrl: 'app/components/setup/setup.component.html',
})
export class SetupComponent {

    public setupRequired:Boolean = true;

    public username:string;
    public password:string;

    constructor(private _userService:UserService, private _socketService:SocketService, private router:Router) { }

    setup() {
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
            this._socketService.getSocket().emit("setup-req", {username: this.username, password: this.password});
            this._socketService.getSocket().on("setup-res", (data) => {
                if(data.reason == "success") {
                    this.router.navigateByUrl("/login");
                }
            })
        }
    }

}