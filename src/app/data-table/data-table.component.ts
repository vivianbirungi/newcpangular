import { AfterViewInit, Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatPaginator , MatSort, MatTable, MatTableDataSource} from '@angular/material';
// import { DataTableDataSource, DataTableItem } from './data-table-datasource';
import {BackendService } from '../providers/backend.service'
import { TrackProgressService } from '../providers/track-progress.service';
import { Router, NavigationExtras } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  // @ViewChild(MatTable, {static: false}) table: MatTable<DataTableItem>;
 
  dataSource = new MatTableDataSource()

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['facilityName','facilityType', 'Code', 'Owner Name', 'State'];
  currentFacility;
  businessState;
  test;
  role;
  modalRef;
  config = {
    backdrop: false
  };
 constructor( private router: Router,private _dataService: TrackProgressService,   private modalService: BsModalService,private spinner: NgxSpinnerService,private tracker: TrackProgressService, private myService: BackendService){
  
 }
  ngOnInit() {
    // this.dataSource = new MatTableDataSource(this.myService.getData())
    this.load();
    this.role = localStorage.getItem('role')
    return this._dataService.fetchFacilities().subscribe((data)=>{
       this.test = data;
       this.test.data.map((item)=>{
         console.log(item.businessState)
        if(item.businessState === ""){
          this.getColor("nothing")
          console.log("nothing")
        }
       })
       this.dataSource.data = this.test.data
       console.log(this.test.data)
       console.log(this.test.data.length)
     })
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
  getColor(state) { (2)
    switch (state) {
      case 'Approved':
        return 'green';
      case 'pending':
        return 'blue';
      case 'rejected':
        return 'red';
        default:
          return 'grey'; 
    }
  }
  onRowClicked(row) {
    this.load()
    console.log('Row clicked: ', row);
    let navigationExtras: NavigationExtras = {
      state: {
      registrationStatus : row
      }
    };
    this.router.navigate(['/singlefacility'], navigationExtras)

  }
  fetchFacilityData(regcode){
  
    this.tracker.getfacilityStatus(regcode).subscribe((data) => {
     this.currentFacility = data;
     this.checkBusinessStatus(this.currentFacility.facilityDocuments)
    })
  }
  trackFacility(row){
  
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  checkBusinessStatus(businessdocuments){
    businessdocuments.filter((data)=>{
      let docState = data.docState
      if (docState == "VALID"){
        this.businessState = "DONE "
        console.log( this.businessState)
      }
      else {
       this.businessState = "PENDING"
       console.log( this.businessState)
      }
      
    })
    
}
  logout(){
    localStorage.clear();
  }
load(){
  this.spinner.show();
 
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
}
openModal(template: TemplateRef<any>, data) {
  this.modalRef = this.modalService.show(template, this.config);
  this.businessState= data.businessState
  console.log(data)
}

}
