import {Component} from '@angular/core';
import {SocketService} from "../../services/socket.service";
import {TranslatePipe} from "ng2-translate/ng2-translate"
import {UserService} from "../../services/user.service";

@Component({
    selector: 'settings',
    templateUrl: 'app/components/settings/settings.component.html',
    providers: [],
    directives: [],
    pipes: [TranslatePipe]
})
export class SettingsComponent {

    private socket;

    public users = [];

    public version = "v0.0.1 PRE ALPHA";

    public debugMode:boolean = false;
    public sslEnabled:boolean = false;
    public maintenanceMode:boolean = false;

    constructor(private _userService:UserService, private _socketService:SocketService) {
        this.socket = this._socketService.getSocket();

        this.socket.on('users-res', (data) => {
            this.users = data;
        });

        this.socket.emit('file-req', {type: "users"});
        this.socket.on("add-res");

        this.socket.emit("settings-req", { type: "debugmode" });
        this.socket.emit("settings-req", { type: "maintenancemode" });
        this.socket.emit("settings-req", { type: "ssl" });

        this.socket.on('settings-res', function(data) {
            switch(data.type) {
                case "debugmode":
                    this.debugMode = data.value;
                    break;
                case "maintenancemode":
                    this.maintenanceMode = data.value;
                    break;
                case "ssl":
                    this.sslEnabled = data.value;
                    break;
            }
        });

        this.socket.on("change-settings-res", function(data) {
            switch(data.type) {
                case "debugmode":
                    this.debugMode = data.value;
                    break;
                case "maintenancemode":
                    this.maintenanceMode = data.value;
                    break;
                case "ssl":
                    this.sslEnabled = data.value;
                    break;
            }
        });
    }

    // add_user() {
    //     this.socket.emit('add-req', {
    //         type: "user",
    //         name: this.username,
    //         password: this.password,
    //         rang: this.rang
    //     });
    // };

    toggleDebugMode() {
        this.socket.emit("change-settings-req", { type: "debugmode", value: !this.debugMode });
    }

    toggleMaintenanceMode() {
        this.socket.emit("change-settings-req", { type: "maintenancemode", value: !this.maintenanceMode });
    }

    toggleSSL() {
        this.socket.emit("change-settings-req", { type: "ssl", value: !this.sslEnabled });
    }

}
