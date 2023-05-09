import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MapPageComponent } from './map-page/map-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { GraphPageComponent } from './graph-page/graph-page.component';
import { NgChartsModule } from 'ng2-charts';
import { GraphSpeciesBarComponent } from './graph-species-bar/graph-species-bar.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { ImportComponent } from './import/import.component';
import { GraphTemperatureComponent } from './graph-temperature/graph-temperature.component';
import { GraphGenusBarComponent } from './graph-genus-bar/graph-genus-bar.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { ReferenceComponent } from './reference/reference.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    MapPageComponent,
    DashboardComponent,
    AboutComponent,
    SignupComponent,
    GraphPageComponent,
    GraphSpeciesBarComponent,
    ImportComponent,
    ReferenceComponent,
    GraphTemperatureComponent,
    GraphGenusBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgChartsModule,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
