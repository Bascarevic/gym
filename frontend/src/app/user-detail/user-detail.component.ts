import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/users.service';
import { UpdateUserPage } from '../update-user/update-user.page';
import { User } from '../users/users.model';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  @Input() user: User;
  isAuthenticated = false;

  constructor(private modalCtrl:ModalController, 
    private loadingCtrl: LoadingController,
    private us: UserService,
    private as: AuthService
    ) { }

  ngOnInit() {
    console.log("ngOnInit")
  }

  closeModal(role = 'edit'){
    this.modalCtrl.dismiss(this.user, role);
  }

  async openEditModal(){
    const modal = await this.modalCtrl.create({
      component: UpdateUserPage,
      componentProps:{user : this.user},

    });
    

    await modal.present();

    const {data: updatedUser} = await modal.onDidDismiss();

    if(updatedUser){
      this.user = updatedUser;
    }

  }
    async onDeleteUser(){
      const loading = await this.loadingCtrl.create({message: 'Deleting...'});
      loading.present();
  
      this.us.
      deleteUsers(this.user.id).
      pipe(take(1))
      .subscribe(()=>{
        loading.dismiss();
        this.closeModal('delete');
      });
    }

}
