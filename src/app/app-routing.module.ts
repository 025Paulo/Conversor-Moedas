import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormComponent } from './form/form.component';
import { ConversorComponent } from './conversor/conversor.component';
import { HistoricoComponent } from './historico/historico.component';

const routes: Routes = [
  {path: "", redirectTo: 'home', pathMatch: 'full'},
  {path: "principal", component: PrincipalComponent},
  {path: "navbar", component: NavbarComponent},
  {path: "form", component: FormComponent},
  {path: "conversor", component: ConversorComponent},
  {path: 'historico', component: HistoricoComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
