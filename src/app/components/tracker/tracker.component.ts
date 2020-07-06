import { Component, OnInit } from '@angular/core';
import {TrackProgressService} from 'src/app/providers/track-progress.service'
import { Router,  NavigationExtras } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss'],
  providers: [DatePipe]
})
export class TrackerComponent implements OnInit {
  // welcome = true
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }
  review = false
  messages = false;
  settings = false
  success = false;
  revision= false;
  pending ;
  collection_date;
  revision_date;
  registrationCode;
  facilityDocuments;
  currentStatus;
  facility;
  myDate = new Date();
  ontime;
  currentStatusbusiness
  minDate: Date;
  maxDate: Date;
  reasondocs = [];
  constructor(public trackprogress:TrackProgressService, private spinner: NgxSpinnerService, private router: Router, private datePipe: DatePipe) { 
 
    if (this.router.getCurrentNavigation().extras.state) {
      this.currentStatus = this.router.getCurrentNavigation().extras.state.registrationStatus;
    
      localStorage.setItem("currentStatus", this.currentStatus)
      this.facility = this.router.getCurrentNavigation().extras.state.facility;
      this.facilityDocuments = this.facility.facilityDocuments
      this.collection_date = this.facility.firstCollectionDate
      console.log(this.currentStatus)
      if (this.currentStatus == "messages"){

        if (this.facility.businessState == "rejected"){

          this.revision = true
          this.pending = false
         this.facilityDocuments.forEach(element => {
           if(element.reason !==""){
             console.log(element)
             this.reasondocs.push(element)
             console.log(this.reasondocs)
           }
           
         });
        //  for(let i of this.facilityDocuments){
        
        //    if (i.reason !==""){
             
        //    }
        //  }
    
        }
        else if (this.facility.businessState == "pending"){
          this.pending = true
          this.revision = false
    
        }
      }
      localStorage.setItem('currentbusiness', JSON.stringify(this.facility))
      //set the trackingCode
      this.registrationCode = this.facility.nin
     console.log(this.registrationCode)
      localStorage.setItem('trackingCode', JSON.stringify(this.registrationCode))
    }
  else{
    this.registrationCode = localStorage.getItem('trackingCode');
    this.currentStatus = localStorage.getItem('currentStatus')  
    this.facilityProggress()
  }
  const currentYear = new Date().getFullYear();
  this.minDate = new Date(currentYear);
  
  

 
  }
  ngOnInit() {
   this.checkdateStatus()
    
  
    
  }
  checkdateStatus(){
    const seconds = Math.floor((+new Date(this.collection_date)) - +new Date()  / 1000);
    if(seconds > 60) {
      this.ontime = true;
      console.log(this.ontime)
      
    }
    else 
    this.ontime = false;  
    console.log(this.ontime)

  }


 
  submitcolDate(coldate){
    this.load()
    console.log('this is' + coldate)
    let firstCollection = this.collection_date
    
    console.log(firstCollection)
    if (coldate === 'collection_date'){
     let CollectionDate = {
      trackingCode : this.registrationCode,
      collectiondate: firstCollection
     }
    this.trackprogress.getcollectiondates(CollectionDate).subscribe((data:any) =>{ 
    this.facilityDocuments = this.facility.facilityDocuments
    if(data.status){
      this.currentStatus = "review"
      localStorage.setItem('firstDate', JSON.stringify(firstCollection)) 
      localStorage.setItem('currentStatus', "review")
    }
    });
  }
  else  if (coldate === 'revisionDate'){
    let revisionDate = {revisiondate: this.revision_date,
         trackingCode: this.registrationCode
    }
    this.trackprogress.getrevisiondates(revisionDate).subscribe((data:any) =>{ 
    if(data.flag){

      this.currentStatus = "review"
      this.spinner.hide();
      localStorage.setItem('firstDate', JSON.stringify(revisionDate)) 
      localStorage.setItem('status', "review")
    
    }
    })
  }}
  gotowelcome(){
    this.currentStatus = 'welcome';
    localStorage.setItem('currentStatus', this.currentStatus)
  }
  facilityProggress(){
    console.log(this.registrationCode)
    this.trackprogress.getfacilityStatus(this.registrationCode).subscribe((data:any )=> {
      if(data.status){
        console.log(data)
         this.facility = data.data;
        this.facilityDocuments = this.facility.facilityDocuments
         console.log(data.data.nin)
         localStorage.setItem('currentStatusbusiness', JSON.stringify(this.facility))
         this.currentStatus = localStorage.getItem('currentStatus');
       
         if (this.currentStatus == "messages"){

          if (this.facility.businessState == "rejected"){
            this.revision = true
            this.pending = false
      
          }
          else if (this.facility.businessState == "pending"){
            this.pending = true
            this.revision = false
      
          }
        }
      }
    });
  }

  load(){
    this.spinner.show();
   
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 5000);
  }
  
  
}
