import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Assigment } from 'src/app/model/assigment';
import { ServiceAssigmentService } from 'src/app/Service/service-assigment.service';

@Component({
  selector: 'app-list-asssigment',
  templateUrl: './list-asssigment.component.html',
  styleUrls: ['./list-asssigment.component.css']
})
export class ListAsssigmentComponent implements OnInit {
  assigments: Assigment[] = [];
  search = '';
  constructor(private service: ServiceAssigmentService, private route: Router) { }

  ngOnInit(): void {
    this.showAssigment();
  }

  showAssigment(): void {
    this.service.getAssigments().subscribe((data: Assigment[]) => {
      this.assigments = data;
    });
  }
  confirmAdd(): void {
    this.route.navigate(['addAssigment']);
  }

  findAssigment(): void {
    this.service.findAssigmentByParam(this.search).subscribe((data: Assigment[]) => {
      this.assigments = data;
    });
  }
}
