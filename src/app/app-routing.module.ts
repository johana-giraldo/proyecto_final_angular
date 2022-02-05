import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardAdminComponent} from "./modulo_admin/components/dashboard-admin/dashboard-admin.component";
import {UsuariosComponent} from "./modulo_admin/components/usuarios/usuarios.component";
import {UsuarioComponent} from "./modulo_admin/components/usuario/usuario.component";
import {SignupComponent} from "./general/signup/signup.component";
import {LoginComponent} from "./general/login/login.component";
import {GeneralAdminComponent} from "./modulo_admin/general-admin/general-admin.component";
import {AuthGuard} from "./guards/auth.guard";
import {SucursalesComponent} from "./modulo_admin/components/sucursales/sucursales.component";
import {SucursalComponent} from "./modulo_admin/components/sucursal/sucursal.component";
import {RolesComponent} from "./modulo_admin/components/roles/roles.component";
import {RolComponent} from "./modulo_admin/components/rol/rol.component";
import {AgendasComponent} from "./modulo_admin/components/agendas/agendas.component";
import {AgendaComponent} from "./modulo_admin/components/agenda/agenda.component";

const routes: Routes = [
  { path: 'signup' , component: SignupComponent},
  { path: 'login' , component: LoginComponent},
  { path: 'admin' , component: GeneralAdminComponent, canActivate: [ AuthGuard ] ,children: [
      { path: 'dashboard', component: DashboardAdminComponent },
      { path: 'usuarios' , component: UsuariosComponent },
      { path: 'usuario/:id', component: UsuarioComponent },
      { path: 'sucursales' , component: SucursalesComponent },
      { path: 'sucursal/:id', component: SucursalComponent },
      { path: 'roles' , component: RolesComponent },
      { path: 'rol/:id', component: RolComponent },
      { path: 'agendas' , component: AgendasComponent },
      { path: 'agenda/:id', component: AgendaComponent }
    ]
  },
  { path: '**', pathMatch: 'full', redirectTo: 'login'}]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
