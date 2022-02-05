import { Component, OnInit } from '@angular/core';
import { UserModel } from "../../models/User.Model";
import { NgForm } from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserModel = new UserModel();
  rememberMe = false;

  constructor( private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('email')){
      // @ts-ignore
      this.user.email = localStorage.getItem('email');
      this.rememberMe = true;
    }
  }

  iniciarSesion(formLogin: NgForm){
    if(formLogin.invalid){ return; }

    Swal.fire({
      icon: 'info',
      text: 'Espere un momento...',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this._auth.login( this.user )
      .subscribe( resp => {
        console.log(resp);
        Swal.close();

        if(this.rememberMe){
          localStorage.setItem('email', this.user.email);
        }

        this._router.navigateByUrl('/admin/dashboard');

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
