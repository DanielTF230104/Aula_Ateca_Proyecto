import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PiedepaginaComponent } from './piedepagina/piedepagina.component';
import { CabeceraComponent } from "./cabecera/cabecera.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PiedepaginaComponent, CabeceraComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  
}
