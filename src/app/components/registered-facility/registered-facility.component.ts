import { Component, OnInit } from '@angular/core';
import {TrackProgressService} from 'src/app/providers/track-progress.service'
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-registered-facility',
  templateUrl: './registered-facility.component.html',
  styleUrls: ['./registered-facility.component.scss']
})
export class RegisteredFacilityComponent implements OnInit {
  facilities
  displayedColumns = ["seqNo", "description", "duration"];
  lessons;
  constructor(public tracker: TrackProgressService, private router: Router) {
    this.lessons=[{seqNo:'3', description:'today', duration:123}, ]
   }

  ngOnInit() {
  }
  
  getAllFacilities(){
    this.tracker.fetchFacilities().subscribe((data)=>{
      this.facilities = data;
    });

  }

onRowClicked(row) {
  console.log('Row clicked: ', row);
  let navigationExtras: NavigationExtras = {
    state: {
    registrationStatus : row
    }
  };

  this.router.navigate(['/singlefacility'], navigationExtras);
}


}
