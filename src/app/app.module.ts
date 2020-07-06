import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RegisterComponent } from './components/register/register.component';
import {MatInputModule} from '@angular/material/input';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { BackendService } from './providers/backend.service';

import { TrackerComponent } from './components/tracker/tracker.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RegisteredFacilityComponent } from './components/registered-facility/registered-facility.component';
import { SingleFacilityComponent } from './components/single-facility/single-facility.component';
import { MatPaginatorModule, MatProgressSpinnerModule, 
  MatSortModule, MatTableModule, MatSnackBarModule , MatFormFieldModule, MatDatepickerModule,
  MatNativeDateModule } from "@angular/material";
  
  import {MatSelectModule} from '@angular/material/select';
import { DataTableComponent } from './data-table/data-table.component';
import { DaysPipe } from './pipes/days.pipe';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NgxSpinnerModule } from "ngx-spinner";
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { FacilitiesComponent } from './components/facilities/facilities.component';
import { ApproveFacilityComponent } from './components/approve-facility/approve-facility.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    RegisterComponent,
    LandingPageComponent,
    HeaderComponent,
    TrackerComponent,
    RegisteredFacilityComponent,
    SingleFacilityComponent,
    DataTableComponent,
    DaysPipe,
    AdminLoginComponent,
    FacilitiesComponent,
    ApproveFacilityComponent,
  
 
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ModalModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    NgxSpinnerModule,
    MatSnackBarModule
    
  
  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
