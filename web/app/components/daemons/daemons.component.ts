import {Component} from "@angular/core";
import {SocketService} from "../../services/socket.service";
import {TranslatePipe} from "ng2-translate/ng2-translate";
import {UserService} from "../../services/user.service";
import {OrderedPipe} from "../../pipes/ordered.pipe";

@Component({
    selector: 'daemons',
    templateUrl: 'app/components/daemons/daemons.component.html',
    providers: [],
    directives: [],
    pipes: [TranslatePipe, OrderedPipe]
})
export class DaemonsComponent {

    public daemons = [];

    constructor(private _userService:UserService, private _socketService:SocketService) {
        this._socketService.getSocket().on('daemons-res', function(data) {
            this.daemons = data;
        });

        this._socketService.getSocket().emit('file-req', {type: "daemons"});
    }
    
}
