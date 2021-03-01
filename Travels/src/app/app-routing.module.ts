import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BinComponent } from './bin/bin.component';
import { TravelAddFromComponent } from './travel-add-from/travel-add-from.component';
import { TravelDetailsComponent } from './travel-details/travel-details.component';
import { TravelsComponent } from './travels/travels.component';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe:  () => redirectLoggedInTo(['/travels']) }},
  { path: 'travels', component: TravelsComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe:  () => redirectUnauthorizedTo(['/login']) }},
  { path: 'form', component: TravelAddFromComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe:() => redirectUnauthorizedTo(['/login'])  }},
  { path: 'bin', component: BinComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: () => redirectUnauthorizedTo(['/login']) }},
  { path: 'tourdetails/:id', component: TravelDetailsComponent, pathMatch: 'full', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: () => redirectUnauthorizedTo(['/login']) }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
