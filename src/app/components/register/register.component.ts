import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { empty } from 'rxjs';
import { AuthService } from 'src/app/providers/auth.service';
import { Router } from '@angular/router';
// import { ConditionalExpr } from '@angular/compiler';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
   form2 = false;
   form1 = true;
   formGroup1 : FormGroup;
   documents = [];
   businessform: any;
   proof_of_address: any;
   doc3 : any;
   governmentbody: any;
   filename:any;
   registrationCode;
  userForm: any;
  firstName;
  count = 0;
  DocError: boolean = false;
  License:any;

  constructor(private builder: FormBuilder,private _snackBar: MatSnackBar, public auth: AuthService, private spinner: NgxSpinnerService, private router: Router, private spinnerService: Ng4LoadingSpinnerService) {
    this.userForm = this.builder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required,  Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)]],
      profile: ['', Validators.required]
    });
    this.formGroup1 = this.builder.group({
      firstName: ['', [Validators.required, Validators.pattern(/(.*[a-z]){3}/i)]],
      lastName: ['', [Validators.required, Validators.pattern(/(.*[a-z]){3}/i)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)]],
      facilityName:  ['', Validators.required],
      nin:  ['', Validators.required],
      facilityType: ['', Validators.required],
      accountNumber: ['', Validators.required],
      position: ['', Validators.required],
      division: ['', Validators.required],
      district: ['', Validators.required],
      postalcode: ['', Validators.required],
      businessForm: ['', Validators.required],
      region: ['', Validators.required],
      road: ['', Validators.required],
      country: ['', Validators.required],
      town:  ['', Validators.required],
     
      
      
  });
   }

  ngOnInit() {
    var formData = new FormData();
    // formData.append('username', 'Chris')
    //  console.log(formData.getAll('username'))
    
  }
 
  next(){
   
      this.form2 = true;
      this.form1 = false;
      this.businessform = this.formGroup1.get('businessForm').value

      console.log(this.businessform)
      if(this.businessform === 'sole'){
        console.log("vivian")
      }
  }

  CheckDoc(){
    console.log(this.documents)
  if(this.businessform ==='sole'){
    if(this.documents.length >= 6){
      this.DocError = false;
      this.register()
    } 
    else {
      this.DocError = true;
      console.log(" The first batch is needed")
    }
  }
  if(this.businessform ==='ngo'){
    if(this.documents.length >= 8){
      console.log("good")
      this.DocError = false;
      this.register()
    } 
    else {
      this.DocError = true;
      console.log(" The first batch is needed")
    }
  }
  if(this.businessform ==='partnership'){
    if(this.documents.length >= 7){
      console.log("good")  
      this.DocError = false;
      this.register()   
    } 
    else {
      this.DocError = true;
      console.log(" The first batch is needed")
     
    }
  }
  if(this.businessform ==='limitedcompany'){
    if(this.documents.length >=7){
      console.log("good")
      this.DocError = false;
      this.register()   
    } 
    else {
      this.DocError = true;
      console.log(" The first batch is needed")
      // ask to check all documents
    }
  }
  if(this.businessform ==='parastiatal'){
    if(this.documents.length >= 3){
      console.log("good") 
      this.DocError = false;
      this.register()  
    } 
    else {
      this.DocError = true;
      console.log(" The first batch is needed")
      // ask to check all documents
    }
  }

}
  register(){
   this.count += 1
  if(this.count==1){
  let document3 = this.doc3  
  let document4 = this.proof_of_address
  let governmentbodyw = this.governmentbody

  if(document3){
    let document ={
      name:"",
      docState:"UNSUPPORTED",
      reason:""
 
    }
    document.name = document3
     this.documents.push(document)
    console.log(this.documents);
  }
  else{
    console.log("nothing")
  }
 
  if(document4){
    let document ={
      name:"",
      docState:"UNSUPPORTED",
      reason:""
 
    }
    document.name = document4
    this.documents.push(document)
  //  console.log(this.documents);
 }
 else{
  console.log("nothing")
}

 if(governmentbodyw){
  let document ={
    name:"",
    docState:"UNSUPPORTED",
    reason:""

  }
  document.name = governmentbodyw
  this.documents.push(document)
  console.log(this.documents);
}
else{
  console.log("nothing")
}}
this.load()

  let facilityData = this.formGroup1.value;
  // facilityData.facilityDocuments = this.documents;

  //  console.log(facilityData)
  //  this.formGroup1.get('facilityDocuments').setValue(facilityData);
   console.log( 'formdata',this.formGroup1)
   
    var form_data = new FormData();
    form_data.append('licence', this.License, this.License.name)
    form_data.append('facilityDocuments', JSON.stringify(this.documents))
   

for ( var key in facilityData ) {
    form_data.append(key, facilityData[key]);
    
}
console.log('form', form_data)
   
  
    this.auth.register(form_data).subscribe((data : any) =>{
     
      if(data.status){
        this.spinner.hide()
        this.registrationCode = data.message.state;
        console.log(data)
        this.router.navigate(['/tracker']);
        localStorage.setItem('currentStatus', 'firsttime')
        localStorage.setItem('trackingCode', data.message.state)

      }
      else{
        this.openSnackBar(data.message.state, "clear")
        
      }

    }

    )
  

}
goback(){
  
 
    for (var i=0; i<= this.documents.length; i ++ ){
      this.documents.pop()

    }
    console.log(this.documents)
   

    this.form1 = true;
    this.form2 = false;
  }
  


getCheckboxValues(ev) {
  // let obj = {
  //   "order" : data
  // }
  let doc = ev.target.name
  let document ={
    name:"",
    docState:"UNSUPPORTED",
    reason:""

  }
  console.log(ev.target.name);
  var index = this.documents.indexOf(doc)
  if(index === -1){
    // val not found, pushing onto array
    document.name = doc
    this.documents.push(document);
    console.log(doc)
  }else{
    // val is found, removing from array
    this.documents.splice(index,1);
    console.log(this.documents)
  }
  // if(ev.target.checked){
  //   // Pushing the object into array
  //   this.documents.push(obj.document);

  // }else {
  //   let el = this.documents.find(itm => itm.document === doc);
  //   console.log("here")
  //   if(el)
  //     this.documents.splice(this.documents.indexOf(el),1);
  //     console.log(this.documents);
  //     console.log("removed")
     
  // }
 
  //Duplicates the obj if we uncheck it
  //How to remove the value from array if we uncheck it
  console.log(this.documents);
  
}

onFileChanged(event) {
  this.License = event.target.files[0]
  console.log(this.License)
  this.filename = this.License.name
}

load(){
  this.spinner.show();
 
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 10000);
}
openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action, {
    duration: 2000,
  });
}


}