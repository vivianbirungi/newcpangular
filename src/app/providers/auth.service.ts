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
  //  this.headers = new HttpHeaders();
  //  this.headers.append(
  //    'Content-Type',
  //    'application/x-www-form-urlencoded; charset=UTF-8'
  //  );
  //  this.headers.append('Accept', 'application/json');
  

  //   this.httpOptions = {
  //   headers: this.headers }
  
 }
 
   


   register(facility){
    return this.http
    .post(this.api_url  +  'v1/account/pre_registration', facility, );
  }
  

  login(userCredentials){
    return this.http
    .get(this.api_url + 'v1/login/' + userCredentials.username +'/' + userCredentials.password)
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
