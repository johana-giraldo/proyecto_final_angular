import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgChartsModule } from "ng2-charts";

/** COMPONENTS **/
import { AppComponent } from './app.component';
import { DashboardAdminComponent } from './modulo_admin/components/dashboard-admin/dashboard-admin.component';
import { MenuAdminComponent } from './modulo_admin/components/shared/menu-admin/menu-admin.component';
import { MenuTiendaComponent } from './modulo_tienda/components/shared/menu-tienda/menu-tienda.component';
import { DashboardTiendaComponent } from './modulo_tienda/components/dashboard-tienda/dashboard-tienda.component';
import { DashboardUsuarioComponent } from './modulo_usuario/components/dashboard-usuario/dashboard-usuario.component';
import { MenuUsuarioComponent } from './modulo_usuario/components/shared/menu-usuario/menu-usuario.component';
import { MenuHeaderComponent } from './modulo_admin/components/shared/menu-header/menu-header.component';
import { GeneralAdminComponent } from './modulo_admin/general-admin/general-admin.component';
import { GeneralTiendaComponent } from './modulo_tienda/general-tienda/general-tienda.component';
import { GeneralUsuarioComponent } from './modulo_usuario/general-usuario/general-usuario.component';
import { MenuHeaderTiendaComponent } from './modulo_tienda/components/shared/menu-header-tienda/menu-header-tienda.component';
import { MenuHeaderUsuarioComponent } from './modulo_usuario/components/shared/menu-header-usuario/menu-header-usuario.component';
import { UsuarioComponent } from './modulo_admin/components/usuario/usuario.component';
import { UsuariosComponent } from './modulo_admin/components/usuarios/usuarios.component';
import { SignupComponent } from './general/signup/signup.component';
import { LoginComponent } from './general/login/login.component';
import { LineChartComponent } from './modulo_admin/components/stats/line-chart/line-chart.component';
import { BarChartComponent } from './modulo_admin/components/stats/bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './modulo_admin/components/stats/doughnut-chart/doughnut-chart.component';
import { SucursalComponent } from './modulo_admin/components/sucursal/sucursal.component';
import { SucursalesComponent } from './modulo_admin/components/sucursales/sucursales.component';
import { RolComponent } from './modulo_admin/components/rol/rol.component';
import { RolesComponent } from './modulo_admin/components/roles/roles.component';
import { AgendaComponent } from './modulo_admin/components/agenda/agenda.component';
import { AgendasComponent } from './modulo_admin/components/agendas/agendas.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardAdminComponent,
    MenuAdminComponent,
    MenuTiendaComponent,
    DashboardTiendaComponent,
    DashboardUsuarioComponent,
    MenuUsuarioComponent,
    MenuHeaderComponent,
    GeneralAdminComponent,
    GeneralTiendaComponent,
    GeneralUsuarioComponent,
    MenuHeaderTiendaComponent,
    MenuHeaderUsuarioComponent,
    UsuarioComponent,
    UsuariosComponent,
    SignupComponent,
    LoginComponent,
    LineChartComponent,
    BarChartComponent,
    DoughnutChartComponent,
    SucursalComponent,
    SucursalesComponent,
    RolComponent,
    RolesComponent,
    AgendaComponent,
    AgendasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
