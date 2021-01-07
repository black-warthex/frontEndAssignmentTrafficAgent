import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assigment } from '../model/assigment';

@Injectable({
  providedIn: 'root'
})
export class ServiceAssigmentService {

  constructor(private http: HttpClient) { }
  url = 'http://localhost:8080/agentManagement/';
  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',

    })
  };
  getAssigments(): Observable<Assigment[]> {
    return this.http.get<Assigment[]>(this.url + 'showAssignmentHistory', this.httpOptions);
  }

  findAssigmentByParam(search: string): Observable<Assigment[]> {
    return this.http.get<Assigment[]>(this.url + 'searchAssignmentHistory/' + search, this.httpOptions);
  }

  saveAssignment(assignment: Assigment): Observable<Assigment> {
    return this.http.post<Assigment>(this.url + 'insertAssignment', assignment);
  }
}

