import { Component, OnInit } from '@angular/core';
import {SucursalModel} from "../../models/Sucursal.Model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SucursalesService} from "../../../services/sucursales.service";
import {ActivatedRoute} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css']
})
export class SucursalComponent implements OnInit {

  sucursal:SucursalModel = new SucursalModel();

  formSucursal: FormGroup;

  constructor(private fb: FormBuilder,
              private _sucursalService: SucursalesService,
              private _route: ActivatedRoute) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id'); //Trae el id del objeto a editar
    console.log("ID: " , id);

    if(id !== 'registrar'){
      this._sucursalService.listarSucursal( id )
        // @ts-ignore
        .subscribe((resp: SucursalModel) => {
          this.sucursal = resp;
          this.sucursal._id = id;
          console.log(this.sucursal)
          this.formSucursal.setValue(this.sucursal)
        });
    }
  }

  get nombreNoValido(){
    return this.formSucursal.get('name').invalid && this.formSucursal.get('name').touched
  }

  get telefonoNoValido(){
    return this.formSucursal.get('phone').invalid && this.formSucursal.get('phone').touched
  }

  get correoNoValido(){
    return this.formSucursal.get('email').invalid && this.formSucursal.get('email').touched
  }

  get direccionNoValida(){
    return this.formSucursal.get('address').invalid && this.formSucursal.get('address').touched
  }

  crearFormulario(){
    this.formSucursal = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(7)]],
      email: ['', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$') ] ],
      address: ['', Validators.required]
    })
  }

  guardar(){
    console.log( "A continuación se muestra todos los datos del formulario")
    console.log( this.formSucursal );

    if ( this.formSucursal.invalid ){
      return Object.values( this.formSucursal.controls ).forEach( control => {control.markAsTouched()})
    }

    this.sucursal._id = this.formSucursal.value._id;
    this.sucursal.name = this.formSucursal.value.name;
    this.sucursal.phone = this.formSucursal.value.phone;
    this.sucursal.email = this.formSucursal.value.email;
    this.sucursal.address = this.formSucursal.value.address;

    if(this.formSucursal.value._id) {
      this._sucursalService.actualizar(this.sucursal)
        .subscribe(resp => console.log(resp));
    } else {
      this._sucursalService.crear(this.sucursal)
        .subscribe(resp => console.log(resp));
    }
    this.formSucursal.reset();

    Swal.fire({
      icon: 'success',
      title: this.sucursal.name,
      text: 'Guardado exitosamente!'
    });

  }

}
