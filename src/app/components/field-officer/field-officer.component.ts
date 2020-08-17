import { Component, OnInit } from '@angular/core';
import { TrackProgressService } from 'src/app/providers/track-progress.service';

@Component({
  selector: 'app-field-officer',
  templateUrl: './field-officer.component.html',
  styleUrls: ['./field-officer.component.scss']
})
export class FieldOfficerComponent implements OnInit {
  myFacilities = [];
  facilityFilter = 'review'
  notifications;
  constructor(public facilities: TrackProgressService) { }

  ngOnInit() {
  }
  getFacilities(id){
    this.facilities.getFieldOfficerFacilities(id).subscribe((data: any)=>{
      if(data.status){
      this.myFacilities = data
      }
    })
  }
 getNotifications(id){
   this.facilities.getNotification(id).subscribe((data:any)=>{
     if(data.status){
     this.notifications = data
      
     }
   })
 }
  
}
