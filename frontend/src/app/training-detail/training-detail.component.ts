import { Component, Input, NgModule, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { AddTrainingPage } from '../add-training/add-training.page';
import { TrainingService } from '../services/trainings.service';
import { Training } from '../trainings/training.model';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TrainingDetailComponent] //nzm jel ovo najbolje resenje
})

@Component({
  selector: 'app-training-detail',
  templateUrl: './training-detail.component.html',
  styleUrls: ['./training-detail.component.scss'],
})
export class TrainingDetailComponent implements OnInit {
  @Input() training: Training;
  isAdmin = false;
  token = null;
  today = null;

  constructor(private modalCtrl:ModalController, 
    private loadingCtrl: LoadingController,
    private ts: TrainingService,
    private alertController: AlertController,
    private as: AuthService
    ) { }


  ngOnInit() {
    console.log("ngOnInit")
    this.isAdmin= this.as.isAdmin;

  //OVO RADI!!!!!!!!!
    console.log(this.isAdmin);
    //console.log(this.token);

    this.today = Date.now();
    console.log(this.today);
   }

  closeModal(role = 'edit'){
    this.modalCtrl.dismiss(this.training, role);
  }

  async openEditModal(){
    const modal = await this.modalCtrl.create({
      component: AddTrainingPage,
      componentProps:{training : this.training},

    });

    await modal.present();

    const {data: updatedTraining} = await modal.onDidDismiss();

    if(updatedTraining){
      this.training = updatedTraining;
    }



  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
  } //provera


  async onDeleteTraining(){
    const loading = await this.loadingCtrl.create({message: 'Deleting...'});
    loading.present();

    this.ts.
    deleteTraining(this.training.id).
    pipe(take(1))
    .subscribe(()=>{
      loading.dismiss();
      this.closeModal('delete');
    });
  }

   makeReservation(training: Training){ //ovde mzd nisam morala da prosledjujem training, jer ovo je detail, on svakako pamti training
    console.log(training);
    if(training.capacity === 0){
      this.presentAlert("This training is full!")
    }
    else{
    this.ts.makeReservation(training).pipe(take(1)).subscribe((res)=>{
      console.log(res);
      if(res.success=='true'){
        this.presentAlert("Succesfully booked training!")
      }
      if(res.success=='date'){
        this.presentAlert("This training already happend!")
      }
      if(res.success=='false'){
        this.presentAlert("You have already booked this training!")
      }
      this.presentAlert
      this.closeModal('reserved');
    });
  }
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
