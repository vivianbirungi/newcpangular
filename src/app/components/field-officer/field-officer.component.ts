import { Component, OnInit } from '@angular/core';
import { TrackProgressService } from 'src/app/providers/track-progress.service';
import { AuthService } from 'src/app/providers/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-field-officer',
  templateUrl: './field-officer.component.html',
  styleUrls: ['./field-officer.component.scss']
})
export class FieldOfficerComponent implements OnInit {
  myFacilities = [];
  facilityFilter = 'review'
  notifications;
  closedFacilities = []
  rejectedFacilities = []
  FieldOfficer;
  allFacilities;
  // currentTime = new Date()
  get now() : string { return Date(); }
  constructor(public facilities: TrackProgressService, public auth : AuthService, public router : Router) { }

  ngOnInit() {
    this.FieldOfficer = JSON.parse(localStorage.getItem("fieldOfficer"))
    // this.getUser('cp2020002');
    this.getFacilities(this.FieldOfficer.fieldOfficerID);
    this.getNotifications(this.FieldOfficer.fieldOfficerID)
  }
  logout(){
    console.log("vivian")
    localStorage.clear();
    this.router.navigate(['/']);
  }
  getUser(id){
    this.auth.getUser(id).subscribe((data:any) =>{
      if(data.status){
        this.FieldOfficer = data.data
       console.log(this.FieldOfficer)
      }
    })
  }
  groupFacilities(facilities){
    console.log(facilities)
      facilities.map((data)=>{
        switch (data.businessState){
          case "review": case "reviewed" : case "pending":{
            this.myFacilities.push(data)
            console.log(this.myFacilities)
            break;
          }
          case 'approved':{
            this.closedFacilities.push(data);
            console.log(this.closedFacilities)
            break;
          }
          case 'rejected':{
            this.rejectedFacilities.push(data);
            console.log(this.rejectedFacilities)
            break;
          }
        }
      })
  }
  getFacilities(id){
    this.facilities.getFieldOfficerFacilities(id).subscribe((data: any)=>{
      if(data.status){
      this.allFacilities = data.data
      // console.log(this.myFacilities)
      this.groupFacilities(data.data)
      }
    })
  }
 getNotifications(id){
   this.facilities.getNotification(id).subscribe((data:any)=>{
     if(data.status){
     this.notifications = data.data
      console.log(this.notifications)
     }
   })
 }
  
}
