import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../../services/users.service";
import {UserModel} from "../../../models/User.Model";
import Swal from "sweetalert2";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  users: UserModel[] = [];
  cargando = true;

  constructor( private _userService: UsersService ) { }

  ngOnInit(): void {
    this._userService.listar()
      .subscribe( resp => {
        this.users = resp;
        this.cargando = false;
      })
  }

  eliminar( user: UserModel, i: number ){

    // @ts-ignore
    Swal.fire({
      title: '¿Está seguro?',
      text: `Desea eliminar a ${ user.fullName }`,
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true
    }).then( resp => {
      if(resp.value){
        this.users.splice(i, 1);
        this._userService.eliminar( user._id ).subscribe();
      }
    });

  }

}
