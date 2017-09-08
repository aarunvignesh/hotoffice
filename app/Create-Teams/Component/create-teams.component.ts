import {Component , Input, ViewChild, OnInit} from "@angular/core";
import { NgStyle } from '@angular/common';
import { FormControl } from "@angular/forms";
import * as moment from "moment";
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'open-office-create-teams',
    templateUrl:'./../Views/create-teams.component.html',
    styleUrls:['./../Styles/main.css']
})
export class createTeamComponent implements OnInit{
 
  page:number = 1;
  userData:any;
  managerList:Array<any>;
  employeeList:Array<any>=[];
  teamData: any= {};
  teamMemberCtrl: FormControl;
  filteredEmployees: Observable<any[]>; 

  collectFields:any = {
    page1:{
      required:["type","name","description"]
    },
    page2:{
      required:["team_members"]
    }

  }

  constructor(private http: Http){
    this.teamMemberCtrl = new FormControl();
    
  }

  filterEmployees(employee: any){
    return this.employeeList.filter(state =>
      (state.first_name.toLowerCase().indexOf(employee.toLowerCase()) === 0 || state.last_name.toLowerCase().indexOf(employee.toLowerCase()) === 0));
  }


  submit(){
    this.http.post("/teams",this.teamData)
    .toPromise()
    .then((response:any)=>{
        try{
          let data = JSON.parse(response._body);
          alert(data.message);
        }  
        catch(e){
          alert("Something Went Wrong!");
        }
    },(response)=>{
      try{
        let data = JSON.parse(response._body);
        alert(data.message);
      }  
      catch(e){
        alert("Something Went Wrong!");
      }
    })
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


  nextPage(){
    this.page += 1;
  }

  prevPage(){
    this.page -= 1;
  }

  selectTeamMember(employee:any){
    this.teamData.team_members = this.teamData.team_members || [];
    var index = this.teamData.team_members.findIndex((value:any) => value._id == employee._id);
    
    if(index >= 0){
      this.teamData.team_members.splice(index,1);
    }
    else{
      
      this.teamData.team_members.push(employee);
    }
  }

  validationForNext(){
    if(this.collectFields["page"+this.page]){
      let disableNext = false;
      for(var i=0;i<this.collectFields["page"+this.page].required.length;i++){
        
        if(!this.teamData[this.collectFields["page"+this.page].required[i]]){
          return true;
        }
      }
      
    }
    return false;
  }
}