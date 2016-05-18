"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ng2_translate_1 = require("ng2-translate/ng2-translate");
var NotificationService = (function () {
    function NotificationService(_translateService) {
        this._translateService = _translateService;
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
    NotificationService.prototype.sendMessage = function (message, error) {
        var translatedMessage = this._translateService.instant(message).toString();
        if (error) {
            $.notify(translatedMessage, {
                style: 'mcs-error'
            });
        }
        else {
            $.notify(translatedMessage, {
                style: 'mcs-info'
            });
        }
    };
    NotificationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [ng2_translate_1.TranslateService])
    ], NotificationService);
    return NotificationService;
}());
exports.NotificationService = NotificationService;
