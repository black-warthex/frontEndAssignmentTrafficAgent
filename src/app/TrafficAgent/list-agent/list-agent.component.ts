import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agent } from 'src/app/model/agent';
import { ServiceAgentService } from 'src/app/Service/service-agent.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-agent',
  templateUrl: './list-agent.component.html',
  styleUrls: ['./list-agent.component.css']
})
export class ListAgentComponent implements OnInit {
  agents: Agent[] | undefined;
  constructor(private service: ServiceAgentService, private router: Router) {}

  ngOnInit(): void {
    this.getListAgent();
  }

  getListAgent(): void{
    this.service.getAgents().subscribe( (data: Agent[]) => {
      this.agents = data;
      });
  }

  confirmDelete(agent: Agent): void{
    Swal.fire({
      title: 'Are you sure to delete?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `delete`,
      cancelButtonText: `cancel`,
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteWay(agent);
      }
    });
  }

  deleteWay(agent: Agent): void{
    this.service.deleteAgent(this.cathAgentCode(agent))
    .subscribe(
      response => {
        this.getListAgent();
      },
      error => {
        console.log(error);
      });
  }

  updateAgent(agent: Agent): void{
    this.cathAgentCode(agent);
    this.router.navigate(['updateAgent']);
}
  cathAgentCode(agent: Agent): string{

    localStorage.setItem('agentCode', '' + agent.agentCode);
    const agentCode = localStorage.getItem('agentCode');
    return (String(agentCode));
  }
  confirmAdd(): void{
    this.router.navigate(['addAgent']);
  }
}
