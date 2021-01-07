import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agent } from 'src/app/model/agent';
import { ServiceAgentService } from 'src/app/Service/service-agent.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.css']
})
export class AddAgentComponent implements OnInit {

  agent: Agent = {
    agentCode: '',
    agentName: '',
    agentSurname: '',
    agentYearsExperience: 0,
    agentSecretaryCode: '',
    agentViaCode: null
  };
  constructor(private router: Router, private service: ServiceAgentService) { }

  ngOnInit(): void {
  }

  saveAgent(): void{
      const agentData: Agent = {
        agentCode: this.agent.agentCode,
        agentName: this.agent.agentName,
        agentSurname: this.agent.agentSurname,
        agentYearsExperience: this.agent.agentYearsExperience,
        agentSecretaryCode: this.agent.agentSecretaryCode,
        agentViaCode: null
      };

      this.service.saveAgent(agentData)
      .subscribe(
        response => {
          const res: string[] = Object.values(response);
          if (res[1] === 'successful insert'){
            Swal.fire({
              icon: 'success',
              title: 'success!',
              text: 'Way added successfully',
            });
            this.router.navigate(['listAgent']);
          }else{
            Swal.fire({
              icon: 'error',
              title: 'error!',
              text: '' + res[1],
            });
            this.router.navigate(['addAgent']);
          }
        },
        error => {
          console.log(error);
        });
  }

}
