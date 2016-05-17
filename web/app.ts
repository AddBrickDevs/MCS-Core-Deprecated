import {APP_BASE_HREF} from '@angular/common';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide, enableProdMode} from '@angular/core';
import {HTTP_PROVIDERS, Http} from '@angular/http';
import {ROUTER_PROVIDERS} from '@angular/router';

import {MCSApp} from './app/mcs-app';
import {
    TRANSLATE_PROVIDERS, TranslateLoader, TranslateStaticLoader,
    TranslateService
} from "ng2-translate/ng2-translate";


// enableProdMode()

bootstrap(MCSApp, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(TranslateLoader, {
        useFactory: (http:Http) => new TranslateStaticLoader(http, 'lang', '.json'),
        deps: [Http]
    }),
    TranslateService,
    provide(APP_BASE_HREF, {useValue: '/'})
]).catch(err => console.error(err));

