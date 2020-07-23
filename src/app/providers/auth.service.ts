import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,   } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api_url
  httpOptions
  headers
  constructor(private http: HttpClient) {

    this.api_url = "http://localhost:9000/";

    this.httpOptions = {
     headers: new HttpHeaders({
       'Accept':  'application/json',
       'Content-Type' : 'multipart/form-data',
       'boundary':'l3iPy71otz'
     })
    
   };
  
 }
 
   register(facility){
    return this.http
    .post(this.api_url  +  'v1/account/pre_registration', facility, );
  }
  

  login(userCredentials){
    return this.http
    .get(this.api_url + 'v1/login/' + userCredentials.email +'/' + userCredentials.password)
  }
  removeField(id){
    return this.http
    .get(this.api_url + 'v1/removeFieldOfficer/' + id )
  }

  addFieldOfficer(data){
    return this.http
    .post(this.api_url + 'v1/account/addFieldOfficer' ,data ,)
  }

toFormData<T>(formValue: T) {
    const formData = new FormData();

    for (const key of Object.keys(formValue)) {
        const value = formValue[key];
        formData.append(key, value);
    }

    return formData;
}
getFieldOfficers(){
  return this.http
  .get(this.api_url +'v1/getFieldOfficers');

}
}
