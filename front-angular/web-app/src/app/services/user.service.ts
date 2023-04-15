import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
const API_URL = 'http://localhost:8080/api/test/';

export interface User {
  id: number;
  roles: string[];
  password: string;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser = new BehaviorSubject<User| null>(null);
  isRegistr: Observable<boolean> = this.currentUser.asObservable().pipe(map((user) => !!user));
  // isNotRegistr: Observable<boolean> = this.currentUser.asObservable().pipe(map((user) => !(!!user)));
  isAdmin = this.currentUser.asObservable().pipe(map((user) => !!user?.roles?.find((role: string) => role === "admin")));
  constructor(private http: HttpClient) { }

  clearUser(): void {
    this.currentUser.next(null);
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }
  
  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
}