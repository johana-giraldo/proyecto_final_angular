import { Component, OnInit } from '@angular/core';
import {RolModel} from "../../models/Rol.Model";
import {ActivatedRoute} from "@angular/router";
import {RolesService} from "../../../services/roles.service";
import Swal from "sweetalert2";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {

  rol:RolModel = new RolModel();

  formRol: FormGroup;

  constructor(private fb: FormBuilder,
              private _rolService: RolesService,
              private _route: ActivatedRoute) {
    this.crearFormulario();
    //this.cargarDatosInicialesFormulario();
  }

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id'); //Trae el id del objeto a editar
    console.log("ID: " , id);

    if(id !== 'registrar'){
      this._rolService.listarRol( id )
        // @ts-ignore
        .subscribe((resp: RolModel) => {
          this.rol = resp;
          this.rol._id = id;
          console.log(this.rol)
          this.formRol.setValue(this.rol)
        });
    }
  }

  get nombreNoValido(){
    return this.formRol.get('name').invalid && this.formRol.get('name').touched
  }

  get descripcionNoValida(){
    return this.formRol.get('description').invalid && this.formRol.get('description').touched
  }

  /*
  get permisosNoValidos(){
    return this.formRol.get('permissions').invalid && this.formRol.get('permissions').touched
  }
   */

  get permissions(){
    return this.formRol.get('permissions') as FormArray;
  }

  crearFormulario(){
    this.formRol = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      permissions: this.fb.array([])
    })
  }

  /*cargarDatosInicialesFormulario(){
    this.formRol.setValue({
      _id: '1',
      name: 'Ramón',
      description: "Todos los permisos",
      permissions: []
    })
  }*/

  agregarPermiso( permiso: string){

    console.log('evento radio')

    this.permissions.push( this.fb.control(permiso, Validators.required ));
    /*
        const check = event.target.checked;
        if(estado === 'crear'){
          this.permissions[0]( this.fb.control(check, Validators.required ));
        }else if ( estado === 'listar'){
          this.permissions[1]( this.fb.control(check, Validators.required ));
        }else if (estado === 'actualizar'){
          this.permissions[2]( this.fb.control(check, Validators.required ));
        }else if (estado === 'eliminar')
        this.permissions[3]( this.fb.control(check, Validators.required ));

     */
  }

  eliminarPermiso(indice: number){
    this.permissions.removeAt(indice);
  }

  guardar(){
    console.log( "A continuación se muestra todos los datos del formulario")
    console.log( this.formRol );

    if ( this.formRol.invalid ){
      return Object.values( this.formRol.controls ).forEach( control => {control.markAsTouched()})
    }

    this.rol._id = this.formRol.value._id;
    this.rol.name = this.formRol.value.name;
    this.rol.description = this.formRol.value.description;
    this.rol.permissions = this.formRol.value.permissions;

    if(this.formRol.value._id) {
      this._rolService.actualizar(this.rol)
        .subscribe(resp => console.log(resp));
    } else {
      this._rolService.crear(this.rol)
        .subscribe(resp => console.log(resp));
    }
    this.formRol.reset();

    Swal.fire({
      icon: 'success',
      title: this.rol.name,
      text: 'Guardado exitosamente!'
    });

  }

}
