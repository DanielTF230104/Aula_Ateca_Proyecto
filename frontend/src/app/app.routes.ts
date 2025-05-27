import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { FormularioComponent } from './formulario/formulario.component';
import { LoginComponent } from './login/login.component';
import { ReservaComponent } from "./servicios/reserva.component";


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: InicioComponent },
    { path: 'formulario', component: FormularioComponent },
    { path: 'formulario/:id', component: FormularioComponent },
    { path: 'servicios', component: ReservaComponent}
  ];
