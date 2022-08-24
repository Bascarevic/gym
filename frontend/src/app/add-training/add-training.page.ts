import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { TrainingService } from '../services/trainings.service';
import { Training } from '../trainings/training.model';


@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.page.html',
  styleUrls: ['./add-training.page.scss'],
})

export class AddTrainingPage implements OnInit {
  @Input() training: Training;
  isEditMode = false;
  form:FormGroup;


  constructor(private ts: TrainingService, 
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
    ) { }

  ngOnInit() {
    this.initAddTrainingForm();

    if(this.training){
      this.isEditMode = true;
      this.setFormValues();
    }
  }

  initAddTrainingForm(){
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      training_room: new FormControl(null, [Validators.required]),
      capacity: new FormControl(null, [Validators.required]),
      time: new FormControl(null, [Validators.required]),
    })
  }


  setFormValues(){
    this.form.setValue({
      name: this.training.name,
      training_room: this.training.training_room,
      capacity: this.training.capacity,
      time: this.training.time

    });

    this.form.updateValueAndValidity();
  }
  closeModal(data=null){
    this.modalCtrl.dismiss(data);
  }

  async submitTraining(){
    //console.log(this.form.value);
   const loading = await this.loadingCtrl.create({message: 'Loading...'});
   loading.present();
   

   let response: Observable<Training>;

   if(this.isEditMode){
    response = this.ts.updateTraining(this.training.id, this.form.value);
   }else{
    response = this.ts.addTraining(this.form.value);
   }

   
   response.pipe(take(1)).subscribe((training)=>{
    //console.log(training)
    this.form.reset();
   loading.dismiss();

   if(this.isEditMode){
    this.closeModal(training);
   }
  });
  }
}
