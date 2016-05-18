import {Injectable} from '@angular/core'

@Injectable()
export class DaemonService {

    private daemons = [];
    private Socket;

    ngOnInit() {
        this.Socket.on('daemons-res', function(data) {
            this.daemons = data;
        });

        this.Socket.emit('file-req', {type: "daemons"});
    }

}