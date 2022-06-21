import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../car';
const baseUrl = "http://localhost:8080/api/cars"

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  update(data: Car, id: string): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  add(data: Car): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
