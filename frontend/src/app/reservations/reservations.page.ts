import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { TrainingService } from '../services/trainings.service';
import { Training } from '../trainings/training.model';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss'],
})
export class ReservationsPage implements OnInit {
  trainings$: Observable<Training[]>;

  constructor(private ts: TrainingService, private loadingCtrl: LoadingController, private modalCtrl:ModalController, private as:AuthService, private router: Router) { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({message: 'Loading...'});

     loading.present();
  
     this.trainings$ = this.ts.myReservations().pipe(
      tap(trainings => {
        loading.dismiss();
        return trainings;
      })
     );

     //console.log(this.trainings$);
  }

  async onDelete(trainingId: number){
    const loading = await this.loadingCtrl.create({message: 'Deleting...'});
    loading.present();

    this.ts.
    deleteReservation(trainingId).
    pipe(take(1))
    .subscribe((res)=>{
      loading.dismiss();
      console.log(res.success);
      console.log(res.training_id);
    });

    this.trainings$ = this.trainings$.pipe(
      map(trainings => {
        trainings.filter((train) => train.id != trainingId);
        return trainings;
      })
    );
   // location.reload(); ovo ne radi, nadji drugi nacin
  }

  onLogOut(){
    this.as.logOut();
    
    this.router.navigateByUrl('/login');
  }

  ngOnDestroy(){
    console.log("ngOnDestroy");
  }

  ionViewWillEnter(){
    console.log("ionViewWillEnter");
    
  }

  ionViewDidEnter(){
    console.log("ionViewDidEnter");
    
  }

  ionViewWillLeave(){
    console.log("ionViewWillLeave");
  }

  ionViewDidLeave(){
    console.log("ionViewDidLeave");
  }
}
