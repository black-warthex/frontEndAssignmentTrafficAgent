import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InsertAssigmentComponent } from './Assigment/insert-assigment/insert-assigment.component';
import { ListAsssigmentComponent } from './Assigment/list-asssigment/list-asssigment.component';
import { HomeComponent } from './home/home.component';
import { AddAgentComponent } from './TrafficAgent/add-agent/add-agent.component';
import { ListAgentComponent } from './TrafficAgent/list-agent/list-agent.component';
import { UpdateAgentComponent } from './TrafficAgent/update-agent/update-agent.component';
import { AddComponent } from './Way/add/add.component';
import { UpdateComponent } from './Way/update/update.component';
import { WayListComponent } from './Way/way-list/way-list.component';

const routes: Routes = [
  {path: 'wayList', component: WayListComponent},
  {path: 'add', component: AddComponent},
  {path: 'update', component: UpdateComponent},
  {path: 'home', component: HomeComponent},
  {path: 'addAgent', component: AddAgentComponent},
  {path: 'listAgent', component: ListAgentComponent},
  {path: 'updateAgent', component: UpdateAgentComponent},
  {path: 'addAssigment', component: InsertAssigmentComponent},
  {path: 'listAssigment', component: ListAsssigmentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
