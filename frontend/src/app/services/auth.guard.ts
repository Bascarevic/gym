import { Injectable } from "@angular/core";
import { async } from "@angular/core/testing";
import { CanLoad, Route, Router, UrlSegment, UrlTree } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";


@Injectable({
    providedIn:'root'
})

export class AuthGuard implements CanLoad{
    constructor(private authService: AuthService, private router:Router, private toastController: ToastController){}

 

    canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(!this.authService.isUserAuthenticated){
            this.router.navigateByUrl('/login');
        }
     
        return this.authService.isUserAuthenticated;
    }


}

