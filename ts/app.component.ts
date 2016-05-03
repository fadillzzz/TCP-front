/// <reference path="../node_modules/angular2/typings/browser.d.ts" />

import {bootstrap} from 'angular2/platform/browser'
import {Component} from 'angular2/core'
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router'
import {SignInComponent} from './sign-in.component'

@Component({
    selector: 'tcp-root',
    templateUrl: '/templates/app.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS]
})
@RouteConfig([{
    path: '/sign-in',
    name: 'SignIn',
    component: SignInComponent
}])
class AppComponent
{
}

bootstrap(AppComponent)
