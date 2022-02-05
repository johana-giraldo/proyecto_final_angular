import { Component, OnInit } from '@angular/core';
import { UserModel } from "../../models/User.Model";
import { NgForm } from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: UserModel = new UserModel();

  constructor( private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {

  }

  registrar(formSignup: NgForm){
    if(formSignup.invalid){ return; }

    Swal.fire({
      icon: 'info',
      text: 'Espere un momento...',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this._auth.signUp( this.user )
      .subscribe( resp => {
        console.log(resp);
        Swal.close();

        this._router.navigateByUrl('/admin');

      }, (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al autenticar',
          text: err.error.error.message,
          allowOutsideClick: false
        });
      })
  }

}
