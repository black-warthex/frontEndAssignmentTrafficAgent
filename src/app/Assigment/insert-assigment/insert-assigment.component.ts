import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agent } from 'src/app/model/agent';
import { Assigment } from 'src/app/model/assigment';
import { Way } from 'src/app/model/way';
import { ServiceAgentService } from 'src/app/Service/service-agent.service';
import { ServiceAssigmentService } from 'src/app/Service/service-assigment.service';
import { ServiceService } from 'src/app/Service/service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-insert-assigment',
  templateUrl: './insert-assigment.component.html',
  styleUrls: ['./insert-assigment.component.css']
})
export class InsertAssigmentComponent implements OnInit {
  agents: Agent[]  = [];
  roads: Way[] = [];
  agentCode = '';
  viaId = 0;
constructor(
  private datePipe: DatePipe,
  private service: ServiceAssigmentService,
  private serviceAgent: ServiceAgentService,
  private serviceWay: ServiceService,
  private router: Router) {}

  ngOnInit(): void {
    this.getAgent();
  }


  getAgent(): void{
    this.serviceAgent.getAgents().subscribe(
      data => {
        this.agents = data;
      });
    this.serviceWay.getWay().subscribe(
       data => {
         this.roads = data;
       });
  }

  saveAssignment(): void{

    const date = new Date();
    const dateFormat = this.datePipe.transform(date, 'yyyy-MM-dd');
    const assignmentData: Assigment = {
      agentManagementId: 0,
      agentCode: this.agentCode,
      viaCode: this.viaId,
      dateAssignment: '' + dateFormat,
      routeName: ''
    };
    this.service.saveAssignment(assignmentData)
    .subscribe(
      response => {
        const res: string[] = Object.values(response);
        if (res[1] === 'successful insert'){
          Swal.fire({
            icon: 'success',
            title: 'success!',
            text: 'Way added successfully',
          });
          this.router.navigate(['listAssigment']);
        }else{
          Swal.fire({
            icon: 'error',
            title: 'error!',
            text: '' + res[1],
          });
          this.router.navigate(['addAssigment']);
        }
      },
      error => {
        console.log(error);
      });
  }
}
