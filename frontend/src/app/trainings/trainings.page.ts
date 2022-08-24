import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TrainingService } from '../services/trainings.service';
import { Training } from './training.model';
import {map, tap} from 'rxjs/operators';
import { LoadingController, ModalController } from '@ionic/angular';
import { TrainingDetailComponent } from '../training-detail/training-detail.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.page.html',
  styleUrls: ['./trainings.page.scss'],
})
  

  export class TrainingsPage implements OnInit {
    trainings$: Observable<Training[]>;
    isAdmin = false;
  
    constructor(private ts: TrainingService, private loadingCtrl: LoadingController, private modalCtrl:ModalController, private as:AuthService, private router: Router) { }
  
    async ngOnInit() {
     const loading = await this.loadingCtrl.create({message: 'Loading...'});
  
     loading.present();
  
     this.trainings$ = this.ts.getTrainings().pipe(
      tap(trainings => {
        loading.dismiss();
        return trainings;
      })
     );

     this.isAdmin = this.as.isAdmin;
    }

    async openDetailModal(training:Training){
      const modal = await this.modalCtrl.create({
        component: TrainingDetailComponent,
        componentProps: {training},
      });

     await modal.present();


     const {data: updatedTraining, role}  = await modal.onDidDismiss();

     if(updatedTraining && role == 'edit'){
      this.trainings$ = this.trainings$.pipe(
        map(trainings => {
          trainings.forEach((train) => {
            if(train.id==updatedTraining.id){
              train = updatedTraining;
            }
            return train;
          });
          return trainings;
        })
      );
     }

     if(role == 'delete' || role=='reserved'){
      this.trainings$ = this.trainings$.pipe(
        map(trainings => {
          trainings.filter((train) => train.id != updatedTraining.id);
          return trainings;
        })
      );
     }
    }

    onLogOut(){
      this.as.logOut();
      
      //window.location.reload();
     this.router.navigateByUrl('/login');
    }

  }


