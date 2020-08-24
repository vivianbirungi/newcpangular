import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { Router, NavigationExtras } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  email
  password;
  Admin;
  fieldOfficer;
  constructor(private auth:AuthService, private router : Router,  private spinner: NgxSpinnerService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

 
  login(){
    this.load()
    let userCredentials = {
      email: this.email,
      password : this.password
    }

    this.auth.login(userCredentials).subscribe((data: any)=>{
      if (data.status){
        console.log(data);
        if(data.role == 'field'){
          this.fieldOfficer = data.data
          localStorage.setItem("fieldOfficer", JSON.stringify(this.fieldOfficer))
          localStorage.setItem("role", 'fieldOfficer')
          localStorage.setItem("usertype", 'fieldOfficer')
          this.router.navigate(["/fieldOfficer"])

        }
        else if(data.role == 'Admin'){
          this.Admin = data.data;
          let localData = this.Admin;
          localData.password  = "";
          localStorage.setItem("Admin", JSON.stringify(localData))
          localStorage.setItem("role", this.Admin.role)
          localStorage.setItem("usertype", this.Admin.role)
          if(this.Admin.role === 'superAdmin'){
          localStorage.setItem("junior", 'Admin')
            
          }else if(this.Admin.role === 'Admin'){
            localStorage.setItem("junior", 'Manager')
              
          }
  
          this.router.navigate(["/facilities"])
        }
      

      }
      else if(!data.status ){
        console.log(data.reason)
        // this.spinner.hide()
        this.openSnackBar("Wrong Password or Email", "clear")
        // this.openSnackBar("Network", "clear")
      }
      if(!data){
        // this.spinner.hide()
        this.openSnackBar("CONNECTION ERROR", "clear")
        // this.openSnackBar("Network", "clear")
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
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 10000,
    });
  }
  
  goback(){
    this.router.navigate(['/']);
  }
}
