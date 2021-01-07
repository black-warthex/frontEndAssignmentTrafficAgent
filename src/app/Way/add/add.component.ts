import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Way } from 'src/app/model/way';
import { ServiceService } from 'src/app/Service/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  way: Way = {
    viaId : 0,
    viaType : '',
    viaClass: '',
    viaNumber: 0,
    viaCongestion: 0
  };
  constructor(private router: Router, private service: ServiceService) { }

  ngOnInit(): void{
  }
  saveWay(): void{
    const data = {
      viaId : 0,
      viaType: this.way.viaType,
      viaClass: this.way.viaClass,
      viaNumber: this.way.viaNumber,
      viaCongestion: this.way.viaCongestion,
    };
    this.service.createWay(data)
    .subscribe(
      response => {
        const res = Object.values(response);
        if (res[1] === 'successful insert'){
          Swal.fire({
            icon: 'success',
            title: 'success!',
            text: 'Way added successfully',
          });
          this.router.navigate(['wayList']);
        }else{
          Swal.fire({
            icon: 'error',
            title: 'error!',
            text: '' + res[1],
          });
          this.router.navigate(['add']);
        }
      },
      error => {
        console.log(error);
      });
  }
}
