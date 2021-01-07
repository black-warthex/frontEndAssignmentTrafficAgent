import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'agentManagementFrontEnd';
  constructor(private router: Router){}

  ngOnInit(): void{
    this.router.navigate(['home']);
  }

  home(): void{
    this.router.navigate(['home']);
  }

  wayList(): void{
    this.router.navigate(['wayList']);
  }
  agentList(): void{
    this.router.navigate(['listAgent']);
  }

  assigmentList(): void{
    this.router.navigate(['listAssigment']);
  }
}
