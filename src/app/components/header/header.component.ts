import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router,  NavigationExtras } from '@angular/router';
import {TrackProgressService} from 'src/app/providers/track-progress.service'
import { AuthService } from 'src/app/providers/auth.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgxSpinnerService } from 'ngx-spinner';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  modalRef: BsModalRef;
  trackingCode;
  facility;
  username;
  password 
  usertype
  config = {
    backdrop: false
  };
  AdminRole;
  constructor(private _snackBar: MatSnackBar, private modalService: BsModalService, private spinner: NgxSpinnerService, private spinnerService: Ng4LoadingSpinnerService, public auth: AuthService, public trackprogress:TrackProgressService,  private router: Router) {

   
   }

  ngOnInit() {
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }
  facilityProggress(){
    if(this.trackingCode != ""){
      this.show()
      this.trackprogress.getfacilityStatus(this.trackingCode).subscribe((data:any )=> {
      
      if(data.status){
        console.log(data.data)
        this.usertype = "FacilityOwner"
        localStorage.setItem("usertype", this.usertype)
        if(data.data.firstCollectionDate != ""){
           if(data.data.businessState == 'pending' || data.data.businessState == 'rejected'){
            let navigationExtras: NavigationExtras = {
              state: {
                facility: data.data,
              registrationStatus : "messages"
              }
            }
            this.spinnerService.hide()
        this.router.navigate(['/tracker'], navigationExtras);

           } else  if(data.data.businessState =='Approved' ){
             console.log("Approved")
            let navigationExtras: NavigationExtras = {
              state: {
                facility: data.data,
              registrationStatus : "Approved"
              }
           }
           this.router.navigate(['/tracker'], navigationExtras);

          }
           
           else{
          let navigationExtras: NavigationExtras = {
          state: {
            facility: data.data,
          registrationStatus : "review"
          }}
          this.spinnerService.hide()
        this.router.navigate(['/tracker'], navigationExtras);
           
        }
        }
      
      else{
        let navigationExtras: NavigationExtras = {
          state: {
            facility: data.data,
          registrationStatus : "welcome"
          }
      }
      this.spinnerService.hide()
      this.router.navigate(['/tracker'], navigationExtras);
      
    }
    this.modalRef.hide();
  }
  // this.openSnackBar(data.message.message, "clear")

    });}
    else {
      this.spinnerService.hide()
      //add an alert
     
      console.log("enter code")
    }
  }
  login(){
    this.load()
    let userCredentials = {
      username: this.username,
      password : this.password
    }

    this.auth.login(userCredentials).subscribe((data: any)=>{
      if (data.status){
        this.modalRef.hide();
        this.spinnerService.hide()
        this.usertype = "Admin"
        localStorage.setItem("usertype", this.usertype)
        localStorage.setItem("role", data.message)
        this.AdminRole = data.message
        this.router.navigate(["/data"])
      }
      else {
        this.spinner.hide()
        // this.openSnackBar(data.message.message, "clear")
        this.openSnackBar("Network", "clear")
      }
      if(data == null){
        this.spinner.hide()
        // this.openSnackBar(data.message.message, "clear")
        this.openSnackBar("Network", "clear")
      }
    })
  }

  
  show()
{
this.spinnerService.show();
setTimeout(()=>this.spinnerService.hide(),6000)
}

load(){
  this.spinner.show();
 
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
}
  

}
