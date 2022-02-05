import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";
import Swal from "sweetalert2";
import {Observable} from "rxjs";
import {AgendaModel} from "../../models/Agenda.Model";
import {AgendasService} from "../../../services/agendas.service";

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  agenda:AgendaModel = new AgendaModel();

  constructor(
    private _agendaService: AgendasService,
    private _route: ActivatedRoute ) { }

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');
    console.log("ID: " , id);

    if(id !== 'registrar'){
      this._agendaService.listarAgenda( id )
        // @ts-ignore
        .subscribe((resp: AgendaModel) => {
          this.agenda = resp;
          this.agenda._id = id;
        })
    }
  }

  guardar( formAgenda: NgForm){

    if(formAgenda.invalid){
      return;
    }

    Swal.fire({
      icon: 'info',
      title: 'Espere...',
      text: 'Guardando la información!',
      allowOutsideClick: false,
      showConfirmButton: false,
      allowEscapeKey: false
    });

    Swal.showLoading();

    let peticion:Observable<any>;

    if(this.agenda._id) {
      peticion = this._agendaService.actualizar( this.agenda );
    } else {
      peticion = this._agendaService.crear( this.agenda );
    }

    peticion.subscribe( resp => {
      Swal.fire({
        icon: 'success',
        title: this.agenda.fullName,
        text: '¡Se almacenó correctamente!'
      });
    });
  }

}
