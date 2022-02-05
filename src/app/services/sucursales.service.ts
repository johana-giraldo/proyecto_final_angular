import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SucursalModel} from "../modulo_admin/models/Sucursal.Model";
import {delay, map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SucursalesService {

  private url = "https://veterinaria-94b21-default-rtdb.firebaseio.com";

  constructor(private _http: HttpClient) {
  }

  crear(sucursal: SucursalModel) {
    return this._http.post(`${this.url}/sucursales.json`, sucursal)
      .pipe(
        map((resp: any) => {
          sucursal._id = resp.name;
          return sucursal;
        })
      )
  }

  actualizar(sucursal: SucursalModel) {

    const sucursalAux = {
      ...sucursal
    }

    // @ts-ignore
    delete sucursalAux._id;

    return this._http.put(`${this.url}/sucursales/${sucursal._id}.json`, sucursalAux);
  }

  listarSucursal(id: string | null){
    return this._http.get(`${ this.url }/sucursales/${ id }.json`);
  }

  eliminar(id: string | null) {
    return this._http.delete(`${this.url}/sucursales/${id}.json`);
  }

  listar() {
    return this._http.get(`${this.url}/sucursales.json`)
      .pipe(
        map(this._convertirAArreglo),
        delay(500)
      );
  }

  private _convertirAArreglo(sucursalObj: object) {
    const sucursales: SucursalModel[] = [];
    console.log( sucursalObj );

    if(sucursalObj === null) {
      return [];
    }

    Object.keys( sucursalObj ).forEach( key => {
      // @ts-ignore
      const sucursal: SucursalModel = sucursalObj[key];
      sucursal._id = key;

      sucursales.push( sucursal );
    } )
    return sucursales;

  }

}
