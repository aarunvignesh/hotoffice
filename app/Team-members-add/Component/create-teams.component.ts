import {Component , Input, ViewChild, OnInit} from "@angular/core";
import { NgStyle } from '@angular/common';
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import * as moment from "moment";
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'open-office-create-dynamic-teams',
    templateUrl:'./../Views/create-teams.component.html',
    styleUrls:['./../Styles/main.css']
})
export class addMembersComponent implements OnInit{
 
  
  userData:any;
  managerList:Array<any>;
  employeeList:Array<any>=[];
  teamData: any= {};
  teamMemberCtrl: FormControl;
  filteredEmployees: Observable<any[]>; 

  

  constructor(private http: Http, private router: Router){
    this.teamMemberCtrl = new FormControl();
    
  }

  filterEmployees(employee: any){
    return this.employeeList.filter(state =>
      (state.first_name.toLowerCase().indexOf(employee.toLowerCase()) === 0 || state.last_name.toLowerCase().indexOf(employee.toLowerCase()) === 0));
  }

  gotoTeams(){
    this.router.navigate(["team-profile"], { preserveQueryParams: true });
  }

  ngOnInit(){
    let self = this;
    this.http.get("/users/data")
    .toPromise()
    .then((response:any)=>{
        try{
          let data = JSON.parse(response._body);
          if(data.length > 0){
            data = data.map((value:any) => ({first_name: value.first_name, last_name: value.last_name, _id: value._id,email: value.email, designation: value.designation}));
            self.userData = data;
            self.managerList = data;
            self.employeeList = data;
            this.filteredEmployees = this.teamMemberCtrl.valueChanges
            .startWith(null)
            .map(state => state ? this.filterEmployees(state) : this.employeeList.slice());
          }
          else{
            self.userData = [];
          }
        }  
        catch(e){
          self.userData = [];
        }
    },()=>{
      self.userData = [];
    })
  }


}