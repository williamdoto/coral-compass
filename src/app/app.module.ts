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
import { GraphPieChartComponent } from './graph-pie-chart/graph-pie-chart.component';
import { GraphSpeciesBarComponent } from './graph-species-bar/graph-species-bar.component';


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
    GraphPieChartComponent,
    GraphSpeciesBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
