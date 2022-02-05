import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { UserModel } from "../../../models/User.Model";
import { UsersService } from "../../../services/users.service";
import { Observable } from "rxjs";
import Swal from "sweetalert2";

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  user:UserModel = new UserModel();

  constructor(
    private _userService: UsersService,
    private _route: ActivatedRoute ) { }

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');
    console.log("ID: " , id);

    if(id !== 'registrar'){
      this._userService.listarUser( id )
      // @ts-ignore
        .subscribe((resp: UserModel) => {
          this.user = resp;
          this.user._id = id;
        })
    }
  }

  guardar( formUser: NgForm){

    if(formUser.invalid){
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

    if(this.user._id) {
        peticion = this._userService.actualizar( this.user );
    } else {
        peticion = this._userService.crear( this.user );
    }

    peticion.subscribe( resp => {
      Swal.fire({
        icon: 'success',
        title: this.user.fullName,
        text: '¡Se almacenó correctamente!'
      });
    });
  }
}
