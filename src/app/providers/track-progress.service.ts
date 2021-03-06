import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,   } from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators'
import {Observable, Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TrackProgressService {
  api_url
  httpOptions
  private _refreshNeeded$ = new Subject<void>();

get refreshNeeded$() {
      return this._refreshNeeded$;
    }
  constructor(private http: HttpClient) {

    this.api_url = "http://localhost:9000/v1";

    this.httpOptions = {
     headers: new HttpHeaders({
       'Accept':  ' application/json',
       'Content-Type' : 'application/json'
     })
   };
   }

  getcollectiondates(collectionDate){
    return this.http
    .post(this.api_url  +  '/setcollectionDate', collectionDate, this.httpOptions);
     
  }
  getrevisiondates(revisionDate){
    return this.http
    .post(this.api_url + '/addrevisonDate', revisionDate, this.httpOptions )
  }
  getfacilityStatus(registrationCode){
    return this.http
    .get(this.api_url + '/fetchAfacility/' + registrationCode )
  }
  fetchFacilities(){
    return this.http
    .get(this.api_url + '/getregfacilities')
    .pipe(
      tap(() =>  {
        this._refreshNeeded$.next();
      })
    );
  }
  validDocuments(documents){
    return this.http
    .post(this.api_url  +  '/validateDocuments', documents, this.httpOptions);
  }
  updateStatus(regcode, businessState){
    return this.http
    .post(this.api_url + '/updateStatus/'+regcode, businessState , this.httpOptions)
  }
  attachFieldOfficer(data){
    return this.http
    .post(this.api_url + '/attachFieldOfficer/'+ data.regcode, data, this.httpOptions)
  }
  sendNotification(notificationdata){
    return this.http
    .post(this.api_url + '/notifyOfficer/', notificationdata, this.httpOptions)
  }
  getFieldOfficerFacilities(id){
    return this.http
    .get(this.api_url + '/fetchofficerfacilities/' +id)
  }
  getNotification(id){
    return this.http
    .get(this.api_url +'/getNotification/' + id)
  }
}
