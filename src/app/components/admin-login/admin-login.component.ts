import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { Router } from '@angular/router';
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
  AdminRole;
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
        localStorage.setItem("role", data.message)
        localStorage.setItem("usertype", data.message)

        this.AdminRole = data.message;
        this.router.navigate(["/facilities"])
      }
      else {
        // this.spinner.hide()
        this.openSnackBar(data.message.message, "clear")
        this.openSnackBar("Network", "clear")
      }
      if(!data){
        // this.spinner.hide()
        this.openSnackBar("CONNECTION Error", "clear")
        this.openSnackBar("Network", "clear")
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
