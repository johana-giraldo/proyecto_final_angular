import { Component, OnInit } from '@angular/core';
import {RolModel} from "../../models/Rol.Model";
import {RolesService} from "../../../services/roles.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  roles: RolModel[] = [];
  cargando = true;

  constructor( private _rolService: RolesService ) { }

  ngOnInit(): void {

    this._rolService.listar()
      .subscribe( resp => {
        this.roles = resp;

        console.log(resp);
        this.cargando = false;
      })
  }

  eliminar( rol: RolModel, i: number ){

    // @ts-ignore
    Swal.fire({
      title: '¿Está seguro?',
      text: `Desea eliminar a ${ rol.name }`,
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true
    }).then( resp => {
      if(resp.value){
        this.roles.splice(i, 1);
        this._rolService.eliminar( rol._id ).subscribe();
      }
    });
  }

}
