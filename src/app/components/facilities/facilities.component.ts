import { Component, OnInit } from '@angular/core';
import { TrackProgressService } from 'src/app/providers/track-progress.service';
import { BackendService } from 'src/app/providers/backend.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from 'src/app/providers/auth.service';
import { MatTableDataSource, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.scss']
})
export class FacilitiesComponent implements OnInit {
  dataSource = new MatTableDataSource()
   displayedColumns = ['facilityName','facilityType', 'Code', 'Owner Name', 'State'];
  test;
  facilityRequest = [];
  request = true;
  approvals= false;
  awaitReviews = false;
  underReviews = false;
  rejects = false;
  awaitReview = [];
  underReview =[];
  approved =[];
  rejected =[];
  fieldOfficers ;
  availableOfficers;
  constructor( private auth: AuthService, private _snackBar: MatSnackBar, private router: Router,private _dataService: TrackProgressService,   private modalService: BsModalService, private spinner: NgxSpinnerService, private tracker: TrackProgressService, private myService: BackendService) { }

  ngOnInit() {
    this.getFacilities();
    this.getFieldOfficers();
  //  this.dataSource.data = this.facilityRequest

  }
  view(tablename){
    switch(tablename){
      case "request":{
        this.dataSource.data = this.facilityRequest
        this.request = true;
        this.approvals= false;
        this.awaitReviews = false;
        this.underReviews = false;
        this.rejects = false;
        console.log(this.dataSource)
        break;
      }
      case "awaitReviews":{
        this.dataSource.data = this.awaitReview
        console.log(this.dataSource)

        this.request = false;
        this.approvals= false;
        this.awaitReviews = true;
        this.underReviews = false;
        this.rejects = false;
        break;
      }
      case "underReviews":{
        this.dataSource.data = this.underReview
        console.log(this.dataSource)
        this.request = false;
        this.approvals= false;
        this.awaitReviews = false;
        this.underReviews = true;
        this.rejects = false;
        break;
      }
      case "approvals":{
        this.dataSource.data = this.approved
        console.log(this.dataSource)
   
        this.request = false;
        this.approvals= true;
        this.awaitReviews = false;
        this.underReviews = false;
        this.rejects = false;
        break;
      }
      
    }
    console.log("what")
  }
  getFacilities(){
    this._dataService.fetchFacilities().subscribe((data)=>{
      this.test = data;
      this.test.data.map((item)=>{
        // console.log(item.businessState)
        // add a switch case;
      //  if(item.businessState === ""){
      //   //  this.getColor("nothing")
      //    console.log("nothing")
      //  }REQUEST, AWAIT, SUBMITTED, REJECTED, APPROVED, REVIEW,
      switch ((item.businessState)) {
        case "request": {
          console.log("Excellent");
          this.facilityRequest.push(item)
          this.dataSource.data = this.facilityRequest;
          console.log(this.facilityRequest)

          break;
       }
       
        case "received": {
          console.log(item);
          this.awaitReview.push(item)
          console.log(this.awaitReview)
          break;
        } 
        case "rejected": {
          console.log("REJECTED");
          this.rejected.push(item)
          console.log(this.rejected)
          break;
        }
        case "Approved": {
          console.log("APPROVED");
          this.approved.push(item)
          console.log(this.approved)
          break;
          }
          case "review": {
            console.log("REVIEW");
            this.underReview.push(item)
          console.log(this.underReview)
            break;
          }
          }
      })
      // console.log(this.test.data)
      // console.log(this.test.data.length)
    })
    

  }
  review(row){
    // modal to check if its yes or not sure(mistake)
    let index: number = this.awaitReview.findIndex(d => d === row);
    console.log(index)

    console.log(this.awaitReview.findIndex(d => d === row));
    row.businessState = 'received'
    this.underReview.push(row)
    console.log(this.awaitReview)
    this.awaitReview.splice(index,1)
    this.dataSource = new MatTableDataSource<Element>(this.awaitReview);
    let regcode = row.nin;
    console.log(regcode);
      let businessState = 'review';
      this.updateStatus(regcode, businessState);

  }
  reviewDocs(row){
    console.log('Row clicked: ', row);
    let navigationExtras: NavigationExtras = {
      state: {
      registrationStatus : row
      }
    };
    this.router.navigate(['/approveFacility'], navigationExtras)
  }
  onRowClicked(row) {
    
      let index: number = this.facilityRequest.findIndex(d => d === row);
      console.log(index)
      console.log(this.facilityRequest.findIndex(d => d === row));
      row.businessState = 'received'
      this.awaitReview.push(row)
      console.log(this.awaitReview)
      this.facilityRequest.splice(index,1)
      this.dataSource = new MatTableDataSource<Element>(this.facilityRequest);
      let regcode = (row.nin).toString;
      let businessState = 'await';
      this.updateStatus(regcode, businessState);
  }
  getFieldOfficers(){
    this.auth.getFieldOfficers().subscribe(data=>{
      this.fieldOfficers = data
      // console.log(this.fieldOfficers);
      if(this.fieldOfficers.status){
        this.availableOfficers = this.fieldOfficers.data;
      }
    });

  }
  updateStatus(regcode, businessState){
    this._dataService.updateStatus(regcode, businessState).subscribe(data => {
      if(data){
        // send a toast status updated
        this.openSnackBar("", "close");
        
      }
    })

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
    localStorage.clear
    this.router.navigate(['/']);
  }

}
