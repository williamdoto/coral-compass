import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MapPageComponent } from './map-page/map-page.component';
import { SignupComponent } from './signup/signup.component';
import { GraphPageComponent } from './graph-page/graph-page.component';
import { ImportComponent } from './import/import.component';
import { pages } from '../../server/urls';


export const routes: Routes = [
    { path: pages.login, component: LoginPageComponent },
    { path: pages.map, component: MapPageComponent },
    { path: pages.about, component: AboutComponent },
    { path: pages.signup, component: SignupComponent },
    { path: pages.graph, component: GraphPageComponent },
    { path: pages.import, component: ImportComponent },
    { path: "", component: DashboardComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
