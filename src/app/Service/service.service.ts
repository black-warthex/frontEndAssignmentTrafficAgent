import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Way } from '../model/way';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  url = 'http://localhost:8080/via/';
  httpOptions = {
    headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
    })
  };
  getWay(): Observable<Way[]>{
    return this.http.get<Way[]>(this.url + 'showListOfVias', this.httpOptions);
  }
  getWayById(wayId: number): Observable<Way>{
    return this.http.get<Way>(this.url + 'findViaById/' + wayId);
  }
  createWay(way: Way): Observable<Way>{
    return this.http.post<Way>(this.url + 'insertVia', way);
  }

  updateWay(way: Way): Observable<Way>{
    return this.http.put<Way>(this.url + 'updateVia', way);
  }

  deleteWay(wayId: number): Observable<Way>{
    return this.http.delete<Way>(this.url + 'deleteVia/' + wayId);
  }


}
