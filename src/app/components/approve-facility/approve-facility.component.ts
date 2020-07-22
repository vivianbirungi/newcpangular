import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { TrackProgressService } from 'src/app/providers/track-progress.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-approve-facility',
  templateUrl: './approve-facility.component.html',
  styleUrls: ['./approve-facility.component.scss']
})
export class ApproveFacilityComponent implements OnInit {
  role;
  notAllowed;
  businessdata;
  businessdocuments;
  documents;
  location;
  businessState: string;
  constructor( private _snackBar: MatSnackBar, private router: Router, public tracker: TrackProgressService) { 

    if (this.router.getCurrentNavigation().extras.state) {
      this.businessdata = this.router.getCurrentNavigation().extras.state.registrationStatus;
      this.businessdocuments = this.businessdata.facilityDocuments;
      this.location = this.businessdata.location2;

      //set the trackingCode
      console.log(this.businessdocuments)
      
      localStorage.setItem('currentbusinessdata', JSON.stringify(this.businessdata))
    }
  else{
    this.businessdata = JSON.parse(localStorage.getItem('currentbusinessdata'))
    this.businessdocuments = this.businessdata.facilityDocuments;
    this.location = this.businessdata.location2;
    console.log(this.businessdata);
    console.log(this.businessdocuments)

  }
  }

  ngOnInit() {
    this.role = localStorage.getItem('role');
  }
  onSubmit(f: NgForm){
    console.log(f);
  
    this.businessdocuments.map((x:any) => {

      if(x.docState == 'VALID'){
        x.reason = ""
      }
      else if (x.docState == 'MISSING') {
        x.reason = "missing"
      }
    });

    
    console.log(this.businessdocuments)
   if (this.role == 'Admin'){
    if(this.businessdocuments.some((x: { reason: string; }) => x.reason != "")){
      this.businessState = 'review';
    }
    else{
      this.businessState ='pending'
    }
   }
   else if(this.role =='superAdmin'){
     console.log(this.businessState)
      
   }
   
   
   let documents = {
    facilityDocuments: this.businessdocuments,
    businessState: this.businessState
  }

    console.log(documents)
    this.tracker.validDocuments(documents, this.businessdata.nin).subscribe((data :any) =>{
      if(data.status){
        this.router.navigate(['/data']);
            
      }
      else{
      this.openSnackBar(data.message, "close");
      this.goback();
      }
      });
   
    
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 10000,
    });
  }
  goback(){
    this.router.navigate(['/data']);
  }
  logout(){
    
  }
  approveFacility(){
    // create the facility Account
  }

}
