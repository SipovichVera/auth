import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

const baseUrl = "http://localhost:8080/api/lesson"
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  userInfo = new Subject<any>();

  constructor(private http: HttpClient) { }

  
  getAllLessons(): Observable<any> {
    return this.http.get(baseUrl);
  }
}
