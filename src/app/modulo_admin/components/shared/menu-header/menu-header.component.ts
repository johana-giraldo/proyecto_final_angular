import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.css']
})
export class MenuHeaderComponent implements OnInit {

  constructor( private _auth: AuthService, private _router: Router ) { }

  ngOnInit(): void {
  }

  salir(){
    this._auth.logout();
    this._router.navigateByUrl('/login' );

  }
}
