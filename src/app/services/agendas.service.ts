import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay, map} from "rxjs";
import {AgendaModel} from "../modulo_admin/models/Agenda.Model";

@Injectable({
  providedIn: 'root'
})
export class AgendasService {

  private url = "https://veterinaria-94b21-default-rtdb.firebaseio.com";

  constructor( private _http: HttpClient ) { }

  crear( agenda: AgendaModel ){
    return this._http.post(`${ this.url }/agendas.json`, agenda )
      .pipe(
        map( (resp: any) => {
          agenda._id = resp.name;
          return agenda;
        })
      )
  }

  actualizar( agenda: AgendaModel ){

    const agendaAux = {
      ...agenda
    }

    // @ts-ignore
    delete agendaAux._id;

    return this._http.put(`${ this.url }/agendas/${ agenda._id }.json`, agendaAux);
  }

  listarAgenda(id: string | null){
    return this._http.get(`${ this.url }/agendas/${ id }.json`);
  }

  eliminar(id: string | null){
    return this._http.delete(`${ this.url }/agendas/${ id }.json`);
  }

  listar(){
    return this._http.get(`${ this.url }/agendas.json`)
      .pipe(
        map( this._convertirAArreglo ),
        delay(1000)
      );
  }

  private _convertirAArreglo( agendaObj: object){
    const agendas: AgendaModel[] = [];
    console.log( agendaObj );

    if(agendaObj === null) {
      return [];
    }

    Object.keys( agendaObj ).forEach( key => {
      // @ts-ignore
      const agenda: AgendaModel = agendaObj[key];
      agenda._id = key;

      agendas.push( agenda );
    } )

    return agendas;
  }

}
