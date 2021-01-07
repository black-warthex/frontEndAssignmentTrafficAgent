import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../Service/service.service';
import Swal from 'sweetalert2';
import { Way } from 'src/app/model/way';

@Component({
  selector: 'app-way-list',
  templateUrl: './way-list.component.html',
  styleUrls: ['./way-list.component.css']
})
export class WayListComponent implements OnInit {

  roads: Way[] | undefined;
  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getListWay();
  }
  confirmDelete(way: Way): void{
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
        this.deleteWay(way);
      }
    });
  }

  deleteWay(way: Way): void{
    this.service.deleteWay(this.cathWayId(way))
    .subscribe(
      response => {
        this.getListWay();
      },
      error => {
        console.log(error);
      });
  }

  updateWay(way: Way): void{
      this.cathWayId(way);
      this.router.navigate(['update']);
  }

  cathWayId(way: Way): number{
    localStorage.setItem('wayId', '' + way.viaId);
    return (Number(localStorage.getItem('wayId')));
  }

  getListWay(): void{
    this.service.getWay().subscribe( (data: Way[]) => {
      this.roads = data;
    });
  }
  createWay(): void{
    this.router.navigate(['add']);
  }
}
