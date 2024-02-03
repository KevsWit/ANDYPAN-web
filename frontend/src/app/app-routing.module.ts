import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { DesarrolladoresComponent } from './components/desarrolladores/desarrolladores.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'catalogo', component:CatalogoComponent},
  {path:'desarrolladores', component:DesarrolladoresComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
