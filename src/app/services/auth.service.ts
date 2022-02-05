import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../models/User.Model";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = "https://identitytoolkit.googleapis.com/v1/accounts";
  private apiKey = "AIzaSyDLWm4ZaRU2X7acJl5VSOnaR3CX3H-1JD4";

  userToken: string = "";

  constructor(private _http: HttpClient) {
    this.getToken();
  }

  login(user:UserModel){
    const data = {
      ...user,
      returnSecureToken: true
    };

    return this._http.post(`${this.url}:signInWithPassword?key=${this.apiKey}`, data)
      .pipe(
        map( resp => {
          // @ts-ignore
          this.saveToken( resp['idToken'] );
          return resp;
        })
      )
  }

  signUp(user:UserModel){
    const data = {
      ...user,
      returnSecureToken: true
    };

    return this._http.post(`${this.url}:signUp?key=${this.apiKey}`, data)
      .pipe(
        map( resp => {
          // @ts-ignore
          this.saveToken( resp['idToken'] );
          return resp;
        })
      )
  }

  logout(){
    localStorage.removeItem('idToken');
    localStorage.removeItem('expiresIn');
  }

  private saveToken(idToken: string){
    this.userToken = idToken;
    localStorage.setItem('idToken', idToken);

    let hoy = new Date();
    hoy.setSeconds(3600);

    localStorage.setItem('expiresIn', hoy.getTime().toString());
  }

  getToken(){
    if( localStorage.getItem('idToken') ){
      // @ts-ignore
      this.userToken = localStorage.getItem('idToken');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }

  isAuth(): boolean {
    if(this.userToken.length < 2) { return false; }

    const expire = Number(localStorage.getItem('expiresIn'));
    const expireAux = new Date();
    console.log(expireAux);
    expireAux.setTime(expire);
    console.log(expireAux.setTime(expire));
    if(expireAux > new Date()){
      console.log("Puede ingresar porque tiene permiso");
      return true;
    } else {
      console.log("NO puede ingresar porque la sesión ya caducó");

      return false;
    }
  }
}
