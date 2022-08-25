import { Injectable, Input } from "@angular/core";
import { CanLoad, Route, Router, UrlSegment, UrlTree } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";


@Injectable({
    providedIn:'root'
})

export class RoleGuard implements CanLoad{
    constructor(private authService: AuthService, private router:Router, private toastController: ToastController){}
  

    async presentToast() {
        const toast = await this.toastController.create({
          message: 'You do not have permission for that option!',
          duration: 2000
        });
         await toast.present();
      }


    canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        

        if(!this.authService.isAdmin){
            this.presentToast();
        }
     
        return this.authService.isAdmin;
    }


}