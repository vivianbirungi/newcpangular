import { Component, OnInit, HostListener, ViewChild, ElementRef, ComponentFactoryResolver } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router, NavigationExtras } from '@angular/router';
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
  invalidDocuments = []
  businessState: string;
  @ViewChild('stickyMenu',{static: false}) stickyMenu: ElementRef;

  sticky: boolean = false;
  elementPosition: any;
  @HostListener('window:scroll', ['$event'])
  handleScroll(){
    const windowScroll = window.pageYOffset;
    if(windowScroll >= this.elementPosition){
      this.sticky = true;
      
    } else {
      this.sticky = false;
      
    }
   
  }
  
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
  ngAfterViewInit(){
    this.elementPosition = this.stickyMenu.nativeElement.offsetTop;
    // console.log(this.stickyMenu.nativeElement)
  }
  ngOnInit() {
    this.role = localStorage.getItem('role');
  }
  // for window scroll events
  getYPosition(e: Event): number {
    return (e.target as Element).scrollTop;
  }
  onSubmit(f: NgForm){
    console.log(f);
  
    this.businessdocuments.map((x:any) => {
     console.log("here")
      if(x.docState == 'VALID'){
        x.reason = ""
      }
      else if (x.docState == 'MISSING') {
        x.reason = "missing"
        this.invalidDocuments.push(x)
      }
      else if (x.docState == 'INVALID'){
        this.invalidDocuments.push(x)
      }
    });
    console.log(this.businessdocuments)
    console.log(this.role)
    this.setBusinessState();
    console.log(this.businessState)
    console.log(this.invalidDocuments)

   
   let documents = {
    facilityDocuments: this.businessdocuments,
    businessState: this.businessState,
    trackingCode: this.businessdata.nin
   }

    // console.log(documents)
    this.tracker.validDocuments(documents ).subscribe((data :any) =>{
      if(data.status){
        this.notifyFieldOfficer(documents)      
        this.router.navigate(['/facilities']); 

      }
      else{
      this.openSnackBar(data.message, "close");
      // this.goback();
      }
      });
   
    
  }
  setBusinessState(){
    if(this.businessdocuments.some((x: { reason: string; }) => x.reason != "")){
      this.businessState = 'pending';
      // this.notifyFieldOfficer(id , x, trackingCode)
    }
    else{
      this.businessState ='reviewed'
    }
  }
  notifyFieldOfficer(document){
    console.log(document)
    if(document.businessState == 'pending'){
      console.log(this.businessdata)
      let invalidDocs = {facilityDocuments:this.invalidDocuments,
        businessState:this.businessState,
        trackingCode:this.businessdata.nin}
        let notificationdata = {InvalidDocs : invalidDocs, facilityName: this.businessdata.facilityName, officerid:this.businessdata.fieldOfficerID}
      
   this.tracker.sendNotification(notificationdata).subscribe((data :any) =>{

    });
    }
    else{
      console.log("not again")
      let notificationdata = {invalidDocs:{facilityDocuments:document.facilityDocuments,
        trackinCode:this.businessdata.nin,
        businessState: this.businessState},
        facilityName: this.businessdata.facilityName,
        officerid: this.businessdata.fieldOfficerID}
   this.tracker.sendNotification(notificationdata).subscribe((data :any) =>{

});
    }
       
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 10000,
    });
  }
  goback(){
    let navigationExtras: NavigationExtras = {
      state: {
      status : "underReview"
      }
    };
    this.router.navigate(['/facilities'], navigationExtras);
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/facilities']);
  }
  approveFacility(){
    // create the facility Account
  }


}
