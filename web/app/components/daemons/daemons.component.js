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
var core_1 = require("@angular/core");
var socket_service_1 = require("../../services/socket.service");
var ng2_translate_1 = require("ng2-translate/ng2-translate");
var user_service_1 = require("../../services/user.service");
var ordered_pipe_1 = require("../../pipes/ordered.pipe");
var DaemonsComponent = (function () {
    function DaemonsComponent(_userService, _socketService) {
        this._userService = _userService;
        this._socketService = _socketService;
        this.daemons = [];
        this._socketService.getSocket().on('daemons-res', function (data) {
            this.daemons = data;
        });
        this._socketService.getSocket().emit('file-req', { type: "daemons" });
    }
    DaemonsComponent = __decorate([
        core_1.Component({
            selector: 'daemons',
            templateUrl: 'app/components/daemons/daemons.component.html',
            providers: [],
            directives: [],
            pipes: [ng2_translate_1.TranslatePipe, ordered_pipe_1.OrderedPipe]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, socket_service_1.SocketService])
    ], DaemonsComponent);
    return DaemonsComponent;
}());
exports.DaemonsComponent = DaemonsComponent;
