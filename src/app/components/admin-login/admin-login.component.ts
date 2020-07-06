import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  email
  password
  constructor() { }

  ngOnInit(): void {
  }

  login(){
    console.log(this.email, this.password)
  }

}
