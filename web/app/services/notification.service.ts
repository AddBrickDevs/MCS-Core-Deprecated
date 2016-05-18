import {Injectable} from '@angular/core'
import {TranslateService} from "ng2-translate/ng2-translate";

@Injectable()
export class NotificationService {

    constructor(private _translateService:TranslateService) {
        $.notify.addStyle('mcs-error', {
            html: "<i class='fa fa-warning'></i> &nbsp; <span data-notify-text/>",
            classes: {
                base: {
                    "color": "#FFFFFF",
                    "background-color": "#D40000",
                    "padding": "5px"
                }
            }
        });

        $.notify.addStyle('mcs-info', {
            html: "<i class='fa fa-info-circle'></i> &nbsp; <span data-notify-text/>",
            classes: {
                base: {
                    "color": "#FFFFFF",
                    "background-color": "#039000",
                    "padding": "5px"
                }
            }
        });
    }

    public sendMessage(message:string, error:boolean) {
        var translatedMessage = this._translateService.instant(message).toString();

        if(error) {
            $.notify(translatedMessage, {
                style: 'mcs-error'
            });
        } else {
            $.notify(translatedMessage, {
                style: 'mcs-info'
            });
        }
    }

}