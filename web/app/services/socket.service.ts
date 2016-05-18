import {Injectable} from '@angular/core'

@Injectable()
export class SocketService {

    private socket;

    constructor() {
        this.socket = io('localhost:8080');
    }

    getSocket() {
        return this.socket;
    }

}