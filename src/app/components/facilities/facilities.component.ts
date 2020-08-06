import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TrackProgressService } from 'src/app/providers/track-progress.service';
import { BackendService } from 'src/app/providers/backend.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalService } from 'ngx-bootstrap/modal';
import {MatPaginator} from '@angular/material/paginator';
import { Router, NavigationExtras } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AuthService } from 'src/app/providers/auth.service';
import {FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { MatTableDataSource, MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.scss']
})
export class FacilitiesComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  oneAtATime: boolean = true;
  modalRef: BsModalRef;
  fieldOfficerData : FormGroup;
  dataSource = new MatTableDataSource()
   displayedColumns = ['facilityName','facilityType', 'Code', 'Location', 'contact','State'];
  test;
  facilityRequest = [];
  currentInfo;
  IsmodelShow= true;
  facilitiesLacking=[];
  request = true;
  approvals= false;
  awaitReviews = false;
  underReviews = false;
  rejects = false;
  noAdmin = false;
  officerFacilities=[];
  facilityAttached;
  awaitReview = [];
  underReview =[];
  approved =[];
  rejected =[];
  fieldOfficers ;
  availableOfficers;
  Admin;
  searchText;
  userRole;
  adminForm;
  admindata;
  errormessage;
  constructor(private builder: FormBuilder, private auth: AuthService, private _snackBar: MatSnackBar, private router: Router,private _dataService: TrackProgressService,   private modalService: BsModalService, private spinner: NgxSpinnerService, private tracker: TrackProgressService, private myService: BackendService) { 
    this.fieldOfficerData = this.builder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required,  Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)]],
      phone: ['', Validators.required],
      division: ['', Validators.required],
      role:['', Validators.required],
      fieldOfficerID: ['', Validators.required]
    });
    this.adminForm = this.builder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required,  Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)]],
      phone: ['', Validators.required],
      adminId: ['', Validators.required]
    })
  }
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getFacilities();
    this.getAdmins("Admin")
    this.userRole = localStorage.getItem("role");
    console.log(this.userRole)
    this.Admin = JSON.parse(localStorage.getItem("Admin"))
    this.getFieldOfficers();
  }
  
  openModal(template: TemplateRef<any>, row, state) {
    console.log(state);
    if(state == 'request' ){
      if( this.userRole == 'superAdmin' || 'Admin'){
      return null;
    }}
    if(state =='await'){
      if( this.userRole == 'superAdmin'){
        return null;

      }
    }
    if(state =='review'){
      if( this.userRole == 'superAdmin'){
        return null;

      }
    }
    else{
    this.modalRef = this.modalService.show(template);
    this.currentInfo = {
      row : row,
      state : state
    }
  }
  }
  openModalField(template){
    console.log("fieldofficer");
    this.modalRef = this.modalService.show(template);
  }
  applyFilter(filterValue: string, section) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  
    if(section == 'request'){
        this.dataSource.data = this.facilityRequest
      this.dataSource.filter = filterValue;
    }
    else  if(section == 'awaitReviews'){
      this.dataSource.data = this.awaitReview
      this.dataSource.filter = filterValue;
    }
    else  if(section == 'underReviews'){
      this.dataSource.data = this.underReview
      this.dataSource.filter = filterValue;
    }
    else  if(section == 'approvals'){
      this.dataSource.data = this.approved
      this.dataSource.filter = filterValue;
    }
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
        this.request = false;
        this.approvals= true;
        this.awaitReviews = false;
        this.underReviews = false;
        this.rejects = false;
        break;
      }               
    }
  }
  changeState(template: TemplateRef<any>){  
    this.modalRef.hide()
    if(this.currentInfo.state == 'request'){
      this.onRowClicked(this.currentInfo.row);
    }
    else if(this.currentInfo.state  =='received'){
     this.review(this.currentInfo.row);
    }   
    console.log(this.currentInfo);
 
  }
  getFacilities(){
    this._dataService.fetchFacilities().subscribe((data)=>{
      this.test = data;
      this.test.data.map((item)=>{
      switch ((item.businessState)) {
        case "request": {
          this.facilityRequest.push(item)
          this.dataSource.data = this.facilityRequest;
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
          case "review": case "reviewed" : case "pending": {
            console.log("REVIEW");
            this.underReview.push(item)
          console.log(this.underReview)
            break;
          }
          }
      })
      this.facilityRequest.map(data =>{
        if(data.fieldOfficerID === ""){
          this.facilitiesLacking.push(data)
        }
      })
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
      let businessState = {businessState:'review'};
      this.updateStatus(regcode, businessState);

  }
  reviewDocs(row, state){
    console.log(state)
    if(this.userRole == 'superAdmin' && row.businessState == 'review'){
      return null;
    }
    else{
    console.log('Row clicked: ', row);
    let navigationExtras: NavigationExtras = {
      state: {
      registrationStatus : row
      }
    };
    this.router.navigate(['/approveFacility'], navigationExtras)
  }}
  onRowClicked(row) {
     console.log(row);
      let index: number = this.facilityRequest.findIndex(d => d === row);
      console.log('here', index)
      console.log(this.facilityRequest.findIndex(d => d === row));
      row.businessState = 'received'
      this.awaitReview.push(row)
      console.log(this.awaitReview)
      this.facilityRequest.splice(index,1)
      this.dataSource = new MatTableDataSource<Element>(this.facilityRequest);
      let regcode = (row.nin);
      let businessState = {businessState:'received'};
      console.log(regcode);
      this.updateStatus(regcode, businessState);
  }
  getFieldOfficers(){
    this.auth.getFieldOfficers().subscribe(data=>{
      this.fieldOfficers = data;
      if(this.fieldOfficers.status){
        this.availableOfficers = this.fieldOfficers.data;
      }
    });
  }
  updateStatus(regcode, state){ 
    this._dataService.updateStatus(regcode, state).subscribe((data:any) => {
      if(data.status){
        this.openSnackBar(data.message, "close");   
      }
      else{
        this.openSnackBar("Network Error", "close");
      }
    })

  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 10000,
    });
  }
  goback(){
    console.log("vivam")
    // this.router.navigate(['/data']);
  }
  logout(){
    console.log("vivian")
    localStorage.clear();
    this.router.navigate(['/']);
  }
  attachFieldOfficer(id){ 
    this.load()
     let data = {
       fieldOfficerID: id,
       regcode : this.facilityAttached
     }
     this.tracker.attachFieldOfficer(data).subscribe((data:any) =>{
          if(data.status){
            this.openSnackBar(data.message, 'close')
            this.officerFacilities.length++;
          }
         else{
          this.openSnackBar('Connection Error', 'close')
         }
    });

  }
  getFacilityCount(id:string){  
    this.officerFacilities = []
    this.test.data.map(item=>{
      if(item.fieldOfficerID === id){
      this.officerFacilities.push(item)
      console.log(this.officerFacilities)
      }
    })
  }
  removeFieldOfficer(id){
    this.auth.removeField(id).subscribe((data:any) =>{
      if(data.status){
        this.getFieldOfficers();
        this.openSnackBar(data.message, 'close');
      }
      else{
        this.openSnackBar(data.message, 'close');
      }
    })
  }
  getAdmins(role){
     this.auth.getAdmin(role).subscribe((data:any)=>{
       if(data.status){
         this.admindata = data.data
           if(this.admindata.adminId == null){
             this.noAdmin = true;
           }
           else {
            this.noAdmin = true;

           }
       }
       else if(!data.status){
        this.noAdmin = true;
         this.errormessage = data.message
       }
     }) 
  }
  removeAdmin(){
    let id = this.admindata.adminId
    this.noAdmin = true;
    console.log(this.admindata);
    this.auth.removeAdmin(id).subscribe((data:any) =>{
      if(data.status){
        console.log(data.message)
        this.openSnackBar(data.message, 'close');
      }
      else{
        this.openSnackBar(data.message, 'close');
      }
    })
  }
  addFieldOfficer(){
      var FieldOfficer = new FormData()
      let Data = this.fieldOfficerData.value;
      for ( var key in Data ) {
           FieldOfficer.append(key, Data[key]); 
      }
      this.auth.addFieldOfficer(FieldOfficer).subscribe((data:any) =>{
      if(data.status){
        this.modalRef.hide()
        this.fieldOfficerData.reset()
        this.openSnackBar("Field Officer Added", 'close');
      }
      else{
        this.openSnackBar("Failed to add Officer", 'close');
      }
    });

  }
addAdmin(){
    var admin = new FormData()
    let Data = this.adminForm.value;
    let fullname = this.adminForm.value.firstname + " " + this.adminForm.value.lastname
    admin.append('fullname', fullname)
    if(this.userRole == 'superAdmin'){
      admin.append('role', 'admin')
    }
    else{
      admin.append('role', 'manager')
    }
    for ( var key in Data ) {
         admin.append(key, Data[key]); 
    }
    this.auth.addAdmin(admin).subscribe((data:any) =>{
    if(data.status){
      this.modalRef.hide()
      this.adminForm.reset()
      this.getAdmins("admin")
      this.openSnackBar("Admin Added", 'close');
    }
    else{
      this.openSnackBar("Failed to add Admin", 'close');
    }
  });

}
  load(){
    this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
      }, 5000);
  }
}
