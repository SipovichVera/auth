import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsAddComponent } from './components/cars-add/cars-add.component';
import { CarsDetailsComponent } from './components/cars-details/cars-details.component';
import { CarsListComponent } from './components/cars-list/cars-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrComponent } from './components/registr/registr.component';

const routes: Routes = [
  { path: '', redirectTo: 'tutorials', pathMatch: 'full' },
  { path: 'cars', component: CarsListComponent},
  { path: 'cars/:id', component: CarsDetailsComponent},
  { path: 'add', component: CarsAddComponent},
  { path:'signup', component: RegistrComponent},
  { path:'signin', component: LoginComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
