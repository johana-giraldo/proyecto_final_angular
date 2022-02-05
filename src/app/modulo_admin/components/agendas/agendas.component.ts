import { Component, OnInit } from '@angular/core';
import {AgendasService} from "../../../services/agendas.service";
import Swal from "sweetalert2";
import {AgendaModel} from "../../models/Agenda.Model";

@Component({
  selector: 'app-agendas',
  templateUrl: './agendas.component.html',
  styleUrls: ['./agendas.component.css']
})
export class AgendasComponent implements OnInit {

  agendas: AgendaModel[] = [];
  cargando = true;

  constructor( private _agendaService: AgendasService ) { }

  ngOnInit(): void {
    this._agendaService.listar()
      .subscribe( resp => {
        this.agendas = resp;
        this.cargando = false;
      })
  }

  eliminar( agenda: AgendaModel, i: number ){

    // @ts-ignore
    Swal.fire({
      title: '¿Está seguro?',
      text: `Desea eliminar a ${ agenda.fullName }`,
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true
    }).then( resp => {
      if(resp.value){
        this.agendas.splice(i, 1);
        this._agendaService.eliminar( agenda._id ).subscribe();
      }
    });

  }

}
