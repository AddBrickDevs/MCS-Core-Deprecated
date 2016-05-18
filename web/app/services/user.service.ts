import {Injectable} from "@angular/core";
import {SocketService} from "./socket.service";

@Injectable()
export class UserService {

    private socket;

    private loggedIn:boolean = false;
    private username:string;
    private password:string;

    constructor(private _socketService:SocketService) {
        this.socket = _socketService.getSocket();
    }

    public isLoggedIn() {
        return this.loggedIn;
    }

    public logIn(username:string, password:string) {
        this.loggedIn = true;
        this.username = username;
        this.password = password;
    }

}