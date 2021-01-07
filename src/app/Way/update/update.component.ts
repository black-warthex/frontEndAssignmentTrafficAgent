import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Way } from 'src/app/model/way';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  wayData: Way | undefined;
  constructor(private router: Router, private service: ServiceService) { }

  ngOnInit(): void {
    this.getWay();
  }

  getWay(): void{
    const wayId = localStorage.getItem('wayId');
    this.service.getWayById(Number(wayId)).subscribe(
      data => {
        this.wayData = data;
      });
  }
  updateWay(way: Way): void{
    this.service.updateWay(way)
    .subscribe(
      response => {
        this.router.navigate(['wayList']);
      },
      error => {
        console.log(error);
      });
  }
}
