import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agent } from 'src/app/model/agent';
import { ServiceAgentService } from 'src/app/Service/service-agent.service';

@Component({
  selector: 'app-update-agent',
  templateUrl: './update-agent.component.html',
  styleUrls: ['./update-agent.component.css']
})
export class UpdateAgentComponent implements OnInit {
  agent: Agent | undefined;
  constructor(private service: ServiceAgentService, private router: Router) {}

  ngOnInit(): void {
    this.getAgent();
  }

  getAgent(): void{
    const agentCode = localStorage.getItem('agentCode');
    this.service.getAgentById(String(agentCode)).subscribe(
      data => {
        this.agent = data;
      });
  }
  saveAgent(agent: Agent): void{
    this.service.updateAgent(agent)
    .subscribe(
      response => {
        this.router.navigate(['listAgent']);
      },
      error => {
        console.log(error);
      });
  }
}
