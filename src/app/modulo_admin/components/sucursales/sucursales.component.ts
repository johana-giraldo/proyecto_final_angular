import { Component, OnInit } from '@angular/core';
import {SucursalModel} from "../../models/Sucursal.Model";
import {SucursalesService} from "../../../services/sucursales.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.css']
})
export class SucursalesComponent implements OnInit {

  sucursales: SucursalModel[] = [];
  cargando = true;

  constructor( private _sucursalService: SucursalesService ) { }

  ngOnInit(): void {
    this._sucursalService.listar()
      .subscribe( resp => {
        this.sucursales = resp;
        console.log(resp);
        this.cargando = false;
      })
  }

  eliminar( sucursal: SucursalModel, i: number ){

    // @ts-ignore
    Swal.fire({
      title: '¿Está seguro?',
      text: `Desea eliminar a ${ sucursal.name }`,
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true
    }).then( resp => {
      if(resp.value){
        this.sucursales.splice(i, 1);
        this._sucursalService.eliminar( sucursal._id ).subscribe();
      }
    });
  }

}
