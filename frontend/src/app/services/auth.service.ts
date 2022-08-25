import { HttpClient } from "@angular/common/http";
import { Injectable, Input } from "@angular/core";
import axios, {Axios} from 'axios';
import { Observable } from "rxjs";
import { User } from "../users/users.model";

interface userDataLogin{
    success:any;
    access_token:any;
    token_type:any;
    user_role: any;
    name_and_surname: any;
}

interface userDataRegister{
    name: string;
    email: string;
    password: string;
}

@Injectable({
    providedIn: 'root'
})

export class AuthService{
    private _isUserAuthenticated = false;
    @Input() _isAdmin = false; //bez false? i dodati else dole

    apiUrl = 'http://127.0.0.1:8000/api';
    user = null;
    role = null;
    @Input() auth_user;

    constructor(private http: HttpClient){}

    get isAdmin():boolean{
        if(this.user_role === "admin"){
            this._isAdmin = true;
        } 
        console.log(this.role)
       return this._isAdmin;
    }

    get isUserAuthenticated():boolean{
        return this._isUserAuthenticated;
    }

    get user_role():string {
        return this.role;
    }

    login(user: userDataLogin){
        this._isUserAuthenticated = true;
        this.user = this.http.post<userDataLogin>(`${this.apiUrl}/login`, user);
        this.user.subscribe(res=>{this.role=res.user_role});
        this.user.subscribe(res=>{this.auth_user=res.name_and_surname});

        
      //  console.log(this.auth_user);
        
        return this.user;
    }

  

    register(user: userDataRegister){
        this._isUserAuthenticated = true;
        return this.http.post<userDataRegister>(`${this.apiUrl}/register`, user);
    }



    logOut(){
        this._isUserAuthenticated = false;

        var config = {
            method: 'post',
            url: 'http://127.0.0.1:8000/api/logout',
            headers:{
                Authorization: "Bearer " + window.sessionStorage.getItem('access_token')
            }
        }
    

   axios(config).then(function(response){
    console.log(JSON.stringify(response.data));
    window.sessionStorage.setItem('access_token', null);
    location.reload();
   }).catch(function(error){
    console.log(error);
   });
}
}