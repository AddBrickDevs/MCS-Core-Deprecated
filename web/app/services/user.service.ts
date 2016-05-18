import {Injectable} from "@angular/core";
import {Cookie} from "ng2-cookies/ng2-cookies";
import {SocketService} from "./socket.service";
import {DataResult} from "../utils/dataresult";

@Injectable()
export class UserService {

    private socket;

    private loggedIn:boolean = false;
    private username:String;
    private password:String;

    constructor(private _socketService:SocketService) {
        this.socket = _socketService.getSocket();
    }

    public isLoggedIn() {
        return this.loggedIn;
    }

    public logIn(username:String, password:String, stay:Boolean, result:Function) {
        if(!this.loggedIn) {
            this.socket.emit("login-req", {username: this.username, password: this.password});
            this._socketService.getSocket().on("login-res", function(data) {
                if(data.reason == "success") {
                    this.loggedIn = true;
                    this.username = username;
                    this.password = password;

                    if(stay) {
                        Cookie.set("username", this.username);
                        Cookie.set("session", data.session);
                    }

                    result(DataResult.Success, null);
                } else {
                    result(DataResult.Error, data.error);
                }
            });
        } else {
            result(DataResult.Error, "already-logged-in");
        }
    }

    public registerUser(username:String, password:String, result:Function) {
        this.socket.emit("setup-req", {username: username, password: password});
        this.socket.on("setup-res", function(data) {
            if(data.reason == "success") {
                result(DataResult.Success, null)
            }
        });
    }

}