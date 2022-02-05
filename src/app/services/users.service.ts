import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserModel } from "../models/User.Model";
import { map, delay } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = "https://veterinaria-11a84-default-rtdb.firebaseio.com";

  constructor( private _http: HttpClient ) { }

  crear( user: UserModel ){
    return this._http.post(`${ this.url }/users.json`, user )
      .pipe(
        map( (resp: any) => {
          user._id = resp.name;
          return user;
        })
      )
  }

  actualizar( user: UserModel ){

    const userAux = {
      ...user
    }

    // @ts-ignore
    delete userAux._id;

    return this._http.put(`${ this.url }/users/${ user._id }.json`, userAux);
  }

  listarUser(id: string | null){
    return this._http.get(`${ this.url }/users/${ id }.json`);
  }

  eliminar(id: string | null){
    return this._http.delete(`${ this.url }/users/${ id }.json`);
  }

  listar(){
    return this._http.get(`${ this.url }/users.json`)
      .pipe(
        map( this._convertirAArreglo ),
        delay(1000)
      );
  }

  private _convertirAArreglo( userObj: object){
    const users: UserModel[] = [];
    console.log( userObj );

    if(userObj === null) {
      return [];
    }

    Object.keys( userObj ).forEach( key => {
      // @ts-ignore
      const user: UserModel = userObj[key];
      user._id = key;

      users.push( user );
    } )

    return users;
  }
}
