import {Component} from '@angular/core';

@Component({
    selector: 'settings',
    templateUrl: 'app/components/settings/settings.html',
    providers: [],
    directives: [],
    pipes: []
})
export class Settings {

    public debugMode:boolean;
    public sslEnabled:boolean;
    public maintenanceMode:boolean;

    constructor() {}
    
}
