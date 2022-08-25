import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/users.service';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { User } from './users.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  users$ : Observable<User[]>;

  searchTerm: string;

  constructor(private loadingCtrl: LoadingController, private modalCtrl:ModalController, private as:AuthService, private router: Router, private us:UserService) { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({message: 'Loading...'});
  
    loading.present();

    this.users$ = this.us.getUsers().pipe(
      tap(users=>{
        loading.dismiss();
        return users; 
      })
    );

    console.log(this.users$);
    if(this.users$){
      console.log("Imam podatke")
    }

  }

  async openDetailModal(user:User){
    const modal = await this.modalCtrl.create({
      component: UserDetailComponent,
      componentProps: {user},
    });

    await modal.present();

    const {data: updatedUser, role} = await modal.onDidDismiss();


    if(updatedUser && role==='edit'){
      this.users$ = this.users$.pipe(
        map(users=>{
          users.forEach((u)=>{
            if(u.id===updatedUser.id){
              u = updatedUser;
            }
            return u;
          });
          return users;
        })
      );
    }

    if(role== 'delete'){
      this.users$ = this.users$.pipe(
        map(users => {
          users.filter((u)=>u.id != updatedUser.id);
          return users;
        })
      );
    }


  }

  onLogOut(){
    this.as.logOut();
    
    this.router.navigateByUrl('/login');
  }



}
