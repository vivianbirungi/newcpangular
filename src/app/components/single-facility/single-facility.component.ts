import { Component, OnInit } from '@angular/core';
import { Router,  NavigationExtras } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TrackProgressService } from 'src/app/providers/track-progress.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-single-facility',
  templateUrl: './single-facility.component.html',
  styleUrls: ['./single-facility.component.scss']
})
export class SingleFacilityComponent implements OnInit {
  notAllowed;
  businessdata;
  businessdocuments;
  documents;
  role;
  businessState: string;
  constructor( private _snackBar: MatSnackBar, private router: Router, public tracker: TrackProgressService) { 
    if (this.router.getCurrentNavigation().extras.state) {
      this.businessdata = this.router.getCurrentNavigation().extras.state.registrationStatus;
      this.businessdocuments = this.businessdata.facilityDocuments;
      //set the trackingCode
      
      localStorage.setItem('currentbusinessdata', JSON.stringify(this.businessdata))
    }
  else{
    this.businessdata = JSON.parse(localStorage.getItem('currentbusinessdata'))
    this.businessdocuments = this.businessdata.facilityDocuments
    console.log(this.businessdata);
  }
  // this.documents= [{name:'doc1', reason:"", verified: true}, {name:'doc2', reason:"", verified: false}, {name:'doc3', reason:"", verified: false} ]
  }

  ngOnInit() {
    this.role =localStorage.getItem("role")
    
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 10000,
    });
  }


  onSubmit(f: NgForm){
    console.log(f);
  
    this.businessdocuments.map((x:any) => {

      if(x.docState == 'VALID'){
        x.reason = ""
      }});

    
    console.log(this.businessdocuments)
   if (this.role == 'Admin'){
    if(this.businessdocuments.some((x: { reason: string; }) => x.reason != "")){
      this.businessState = 'rejected'
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
    businessState: this.businessState,
    trackingCode: this.businessdata.nin
  }

    console.log(documents)
    this.tracker.validDocuments(documents).subscribe((data :any) =>{
      if(data.status){
        this.router.navigate(['/data']);
            
      }
      else{
      this.openSnackBar(data.message, "close")
      this.goback()
      }
      });
   
    
  }
  goback(){
    this.router.navigate(['/data']);
  }
  // updateField(index: number, field: string ) {
  //   const control = this.getControl(index, field);
  //   if (control.valid) {
  //     this.entities = this.entities.map((e, i) => {
  //       if (index === i) {
  //         return {
  //           ...e,
  //           [field]: control.value
  //         }
  //       }
  //       return e;
  //     })
  //   }
  // }

}
