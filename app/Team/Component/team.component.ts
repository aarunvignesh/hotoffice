import {Component , Input, ViewChild, OnInit} from "@angular/core";
import * as moment from "moment";
import { Router } from '@angular/router';
import { loginService } from './../../Login/Service/login.service';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'openp-office-teams',
    templateUrl:'./../Views/team.component.html',
    styleUrls:['./../Styles/main.css']
})
export class teamComponent implements OnInit{
 	
 teamData: Array<any>;	 
 userData: any;
  constructor(private http: Http, private router: Router, private login: loginService){
    this.userData = login.getAuthData();
  }


  selected(team :any){
    this.router.navigate(["team-profile"],{queryParams:{id: team._id}});
  }

  createTeams(){
    this.router.navigate(["create-teams"]);
  }

  gotoEditTeams(team:any){
    this.router.navigate(["create-teams"],{queryParams:{id:team._id}});
  }

ngOnInit(){
    let self = this;
    this.http.get("/teams/data")
    .toPromise()
    .then((response:any)=>{
        try{
          let data = JSON.parse(response._body);
          if(data.length > 0){
            self.teamData = data;
          }
          else{
            self.teamData = [];
          }
        }  
        catch(e){
          self.teamData = [];
        }
    },()=>{
      self.teamData = [];
    })
  }

}