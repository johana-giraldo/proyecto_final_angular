import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RolModel} from "../modulo_admin/models/Rol.Model";
import {delay, map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private url = "https://veterinaria-94b21-default-rtdb.firebaseio.com";

  constructor(private _http: HttpClient) {
  }

  crear(rol: RolModel) {
    return this._http.post(`${this.url}/roles.json`, rol)
      .pipe(
        map((resp: any) => {
          rol._id = resp.name;
          return rol;
        })
      )
  }

  actualizar(rol: RolModel) {

    const RolAux = {
      ...rol
    }

    // @ts-ignore
    delete RolAux._id;

    return this._http.put(`${this.url}/roles/${rol._id}.json`, RolAux);
  }

  listarRol(id: string | null){
    return this._http.get(`${ this.url }/roles/${ id }.json`);
  }

  eliminar(id: string | null) {
    return this._http.delete(`${this.url}/roles/${id}.json`);
  }

  listar() {
    return this._http.get(`${this.url}/roles.json`)
      .pipe(
        map(this._convertirAArreglo),
        delay(1000)
      );
  }

  private _convertirAArreglo(rolObj: object) {
    const roles: RolModel[] = [];
    console.log( rolObj );

    if(rolObj === null) {
      return [];
    }

    Object.keys( rolObj ).forEach( key => {
      // @ts-ignore
      const rol: RolModel = rolObj[key];
      rol._id = key;

      roles.push( rol );
    } )
    return roles;

  }

}
