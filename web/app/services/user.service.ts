import {Injectable} from '@angular/core'

@Injectable()
export class LoginService {

    private loggedIn:boolean = false;
    private username:String;
    private password:String;

    public isLoggedIn() {
        return this.loggedIn;
    }

    public logIn(username:String, password:String) {
        this.loggedIn = true;
        this.username = username;
        this.password = password;
    }

    public logOut() {
        this.loggedIn = false;
        this.username = null;
        this.password = null;
    }

}