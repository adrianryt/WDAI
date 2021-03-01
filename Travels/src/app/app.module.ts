import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TravelsComponent } from './travels/travels.component';
import { TravelAddFromComponent } from './travel-add-from/travel-add-from.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingComponent } from './rating/rating.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BinComponent } from './bin/bin.component';
import { FiltersComponent } from './filters/filters.component';
import { AngularFireModule } from "@angular/fire";
import { environment } from '../environments/environment';
import { TravelDetailsComponent } from './travel-details/travel-details.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    TravelsComponent,
    TravelAddFromComponent,
    RatingComponent,
    BinComponent,
    FiltersComponent,
    TravelDetailsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
