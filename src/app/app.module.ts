import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WayListComponent } from './Way/way-list/way-list.component';
import { AddComponent } from './Way/add/add.component';
import { UpdateComponent } from './Way/update/update.component';
import { FormsModule } from '@angular/forms'
import { HomeComponent } from './home/home.component';
import { AddAgentComponent } from './TrafficAgent/add-agent/add-agent.component';
import { ListAgentComponent } from './TrafficAgent/list-agent/list-agent.component';
import { UpdateAgentComponent } from './TrafficAgent/update-agent/update-agent.component';
import { InsertAssigmentComponent } from './Assigment/insert-assigment/insert-assigment.component';
import { ListAsssigmentComponent } from './Assigment/list-asssigment/list-asssigment.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    WayListComponent,
    AddComponent,    
    UpdateComponent,
    HomeComponent,    
    AddAgentComponent, ListAgentComponent, UpdateAgentComponent, InsertAssigmentComponent, ListAsssigmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,    
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
