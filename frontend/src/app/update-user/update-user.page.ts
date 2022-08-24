import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserService } from '../services/users.service';
import { User } from '../users/users.model';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.page.html',
  styleUrls: ['./update-user.page.scss'],
})
export class UpdateUserPage implements OnInit {
  @Input() user: User;
  isEditMode = false;
  form:FormGroup;

  constructor(private us: UserService, 
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
    ) { }

  ngOnInit() {
    this.initForm();

    if(this.user){
      this.isEditMode = true;
      this.setFormValues();
    }
   
  }


  initForm(){
    this.form = new FormGroup({
      name_and_surname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required])
    })
  }
   //ovo ovde ne radi posao
  setFormValues(){
    console.log("Ovo je set form values")
    this.form.setValue({
      name_and_surname: this.user.name_and_surname,
      email: this.user.email,
      
    });
    console.log(this.user.name_and_surname);

    this.form.updateValueAndValidity();
  }

  closeModal(data=null){
    this.modalCtrl.dismiss(data);
  }

  async submitUser(){
    const loading = await this.loadingCtrl.create({message: 'Loading...'});
   loading.present();

   let response : Observable<User>;

   console.log("ovo je form value: " + this.form.value)
   if(this.isEditMode){
   response = this.us.updateUsers(this.user.id, this.form.value);
   }

   console.log(response);

   response.pipe(take(1)).subscribe((user)=>{
    this.form.reset();
   loading.dismiss();

   if(this.isEditMode){
   this.closeModal(user);
   }
   
  });
  }

}
