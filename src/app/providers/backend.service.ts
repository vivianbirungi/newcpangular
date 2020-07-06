import { Injectable } from '@angular/core';
// import { STUDENTS } from './mock.data'; //this is mock.data , Also bring import mock.data.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
// import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable ,  BehaviorSubject } from 'rxjs';
import {STUDENTS} from './model.data';
import { Item } from './data.type';



@Injectable()
export class BackendService {
  /** this is mock.data , Also bring import mock.data.ts
  students = STUDENTS["0"]["data"]; 
  */
  /**  PHP method to retreive data from PHP API
  private _backendUrl = "http://elisheducation.com/MNJIC/connection_api.php?action=f";
  */
  students = STUDENTS["0"]["data"];
  
api_url = "";
httpOptions

  constructor( private _http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json',
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
      })
    };
   
    // this.itemsCollection = afs.collection<any>(this._firebaseCollURL);
    //this.items = this.itemsCollection.valueChanges();
    //this.itemDoc = afs.doc<any>('APP_DATA');
    //this.item = this.itemDoc.valueChanges();
  }

  //helper function to save date on updatedAt, createdAt
  getCurrentDate() {
    return new Date();
    //return firebase.firestore.FieldValue.serverTimestamp();
  }

  setData(data) {
    
  }
  getData(){
       return this.students
  }

  
}