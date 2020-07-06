import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RegisterComponent} from './components/register/register.component';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {TrackerComponent} from './components/tracker/tracker.component';
import {RegisteredFacilityComponent} from './components/registered-facility/registered-facility.component';
import {SingleFacilityComponent} from './components/single-facility/single-facility.component'
import { DataTableComponent } from './data-table/data-table.component';

import { AuthguardGuard} from './authguard.guard'
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { FacilitiesComponent } from './components/facilities/facilities.component';
import { ApproveFacilityComponent } from './components/approve-facility/approve-facility.component';
const routes: Routes = [{path: 'welcome', component: WelcomeComponent}, {path:'register', component: RegisterComponent}, {path: '', component: LandingPageComponent},{path: 'login', component: AdminLoginComponent},{path: 'facilities', component: FacilitiesComponent},{path :'approveFacility', component:ApproveFacilityComponent},
{path: 'tracker', component: TrackerComponent}, {path: 'regfacilities', component: RegisteredFacilityComponent}, {path: 'singlefacility', component: SingleFacilityComponent}, 
{path: 'data', component : DataTableComponent,  canActivate: [AuthguardGuard] }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
