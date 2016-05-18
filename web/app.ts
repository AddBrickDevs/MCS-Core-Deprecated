import {APP_BASE_HREF} from '@angular/common';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide, enableProdMode} from '@angular/core';
import {HTTP_PROVIDERS, Http} from '@angular/http';
import {ROUTER_PROVIDERS} from '@angular/router';
import {UserService} from './app/services/user.service'

import {MCSApp} from './app/mcs-app';
import {TranslateLoader, TranslateStaticLoader, TranslateService} from "ng2-translate/ng2-translate";
import {SocketService} from "./app/services/socket.service";
import {NotificationService} from "./app/services/notification.service";

// enableProdMode()

bootstrap(MCSApp, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(TranslateLoader, {
        useFactory: (http:Http) => new TranslateStaticLoader(http, 'lang', '.json'),
        deps: [Http]
    }),
    TranslateService, UserService, SocketService, NotificationService,
    provide(APP_BASE_HREF, {useValue: '/'})
]).catch(err => console.error(err));

