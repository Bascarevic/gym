import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../users/users.model";

@Injectable({
    providedIn: 'root'
})

export class UserService{
    apiUrl = 'http://127.0.0.1:8000/api';
    constructor(private http: HttpClient){}

    getUsers(): Observable<User[]>{
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.sessionStorage.getItem('access_token')}`
        });
        let options = {headers:headers  };
        return this.http.get<User[]>(`${this.apiUrl}/users`, options);
    }

    updateUsers(userId: number, user: User):Observable <User>{
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.sessionStorage.getItem('access_token')}`
        });
        let options = {headers:headers  };
        return this.http.put<User>(`${this.apiUrl}/users/${userId}`, user, options);
    }

    deleteUsers(userId:number): Observable<User>{
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.sessionStorage.getItem('access_token')}`
        });
        let options = {headers:headers  };
        return this.http.delete<User>(`${this.apiUrl}/users/${userId}`, options);
    }
    
}