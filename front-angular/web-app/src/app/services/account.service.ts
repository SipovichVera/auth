import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

const baseUrl = "http://localhost:8080/api/lesson"
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  userInfo = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }


  getAllLessons(): Observable<any> {
    return this.http.get(baseUrl);
  }
}
