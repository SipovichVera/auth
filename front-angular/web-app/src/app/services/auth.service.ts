import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

const API = "http://localhost:8080/api/auth/"
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable(
    {providedIn: "root"}
)
export class AuthService {

    constructor(private http: HttpClient) {}

    login(username: string, password: number): Observable<any> {
        return this.http.post(API + 'signin', {username, password},
        httpOptions);
    }
    
    registr(username:string, password: number): Observable<any> {
        return this.http.post(API + "signup", {username, password},
        httpOptions);
    }
}
