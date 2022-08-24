import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Training } from "../trainings/training.model";


interface reservationData{
    success:any;
    existed:any;
}
interface deleteResponse{
    success: any;
    training_id:any;
}


@Injectable({
    providedIn: 'root'
})

export class TrainingService{
    apiUrl = 'http://127.0.0.1:8000/api'; 

    constructor(private http: HttpClient){}

  

    getTrainings(): Observable <Training[]>{
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.sessionStorage.getItem('access_token')}`
        });
        let options = {headers:headers  };
        return this.http.get<Training[]>(`${this.apiUrl}/trainings`, options);
    }

    addTraining(training: Training):Observable <Training>{
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.sessionStorage.getItem('access_token')}`
        });
        let options = {headers:headers  };
        return this.http.post<Training>(`${this.apiUrl}/trainings`, training, options);
    }

    updateTraining(trainingId: number, training: Training):Observable <Training>{
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.sessionStorage.getItem('access_token')}`
        });
        let options = {headers:headers  };
        return this.http.put<Training>(`${this.apiUrl}/trainings/${trainingId}`, training, options);
    }

    deleteTraining(trainingId:number): Observable<Training>{
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.sessionStorage.getItem('access_token')}`
        });
        let options = {headers:headers  };
        return this.http.delete<Training>(`${this.apiUrl}/trainings/${trainingId}`, options);
    }

    makeReservation(training: Training){
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.sessionStorage.getItem('access_token')}`
        });
        let options = {headers:headers  };

        return this.http.post<reservationData>(`${this.apiUrl}/reservation`, training, options);
    } //OBRATI PAZNJU OVDE STA SE SALJE I KAKO

    myReservations(): Observable<Training[]>{
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.sessionStorage.getItem('access_token')}`
        });
        let options = {headers:headers  };
        return this.http.get<Training[]>(`${this.apiUrl}/reservation`, options);
    }

    deleteReservation(trainingId:number){
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.sessionStorage.getItem('access_token')}`
        });
        let options = {headers:headers  };
        return this.http.delete<deleteResponse>(`${this.apiUrl}/reservation/${trainingId}`, options); //ovo bi valjda trebalo da je okej
    }

/*
    getDataAuth(token){
        console.log(token);
        let headers = new HttpHeaders({'Accept':'application/json', 'Authorization': '${token}'});
//nije login za rutu????
        return this.http.post(`http://127.0.0.1:8000/api/login`, {}, {headers: headers});
    }
    */
}