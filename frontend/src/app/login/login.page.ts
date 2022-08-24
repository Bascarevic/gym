import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @Input() type: string;
  @Input() placeholder: string;
  logInForm: FormGroup;

  constructor(private authService: AuthService, private router:Router,   private alertController: AlertController){} 

  ngOnInit() {
    this.logInForm = new FormGroup({
      email:new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }


  onLogIn(){
    console.log(this.logInForm.value);
    this.authService.login(this.logInForm.value).subscribe(res=>{
      if(res.success==true){
        console.log("Uspesno!");
        console.log(res.user_role);

        window.sessionStorage.setItem("access_token", res.access_token);

        this.router.navigateByUrl('/welcome');


      }else{
        console.log('Neuspesno!')
        this.presentAlert
        this.presentAlert("Pogresno uneti podaci!")
      }
    })

    this.logInForm.reset();
  }

  async presentAlert(odgovor: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: odgovor,
      buttons: ['OK'],
    });

    await alert.present();


}
}
