import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Agent } from '../model/agent';

@Injectable({
  providedIn: 'root'
})
export class ServiceAgentService {

  private url = 'http://localhost:8080/transitAgent/';

  constructor(private http: HttpClient) { }


  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    })
  };

  getAgents(): Observable<Agent[]> {
    return this.http.get<Agent[]>(this.url + 'showListOfAgents', this.httpOptions);
  }

  getAgentById(agentCode: string): Observable<Agent> {
    return this.http.get<Agent>(this.url + 'findTransitAgentById/' + agentCode);
  }

  updateAgent(agent: Agent): Observable<Agent>  {
    return this.http.put<Agent>(this.url + 'updateAgent', agent);
  }

  deleteAgent(agentCode: string): Observable<Agent>  {
    return this.http.delete<Agent>(this.url + 'deleteAgent/' + agentCode);
  }

  saveAgent(agent: Agent): Observable<Agent>  {
    return this.http.post<Agent>(this.url + 'insertAgent', agent);
  }

}
