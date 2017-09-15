import {Component , Input, ViewChild, OnInit} from "@angular/core";
import * as moment from "moment";
import { Http, Response } from '@angular/http';
import {loginService} from "./../../Login/Service/login.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'open-office-team-profile',
    templateUrl:'./../Views/team.component.html',
    styleUrls:['./../Styles/main.css']
})

export class teamProfileComponent implements OnInit{
  selected(user :any){
    this.router.navigate(["employee-profile"],{queryParams:{id: user._id}});
  }

 teamData: Array<any> = [];	 
 agileTeam: Array<any> = [];
 functionalTeam: Array<any> = [];
 teamProfile: any = {};
 userData:any = {};

constructor(private http: Http, private activatedRoute :ActivatedRoute, private router: Router, private login: loginService){
  this.userData = login.getAuthData();
}

gotoAddTeam(){
  this.router.navigate(["add-team-members"], { preserveQueryParams: true });
}

ngOnInit(){
    let self = this;
    let team_id = this.activatedRoute.snapshot.queryParams["id"];
    this.http.get("/teams/data")
    .toPromise()
    .then((response:any)=>{
        try{
          let data = JSON.parse(response._body);
          if(data.length > 0){
            self.teamData = data;
            self.agileTeam.filter((value: any) => value.type == "Agile");
            self.functionalTeam.filter((value: any) => value.type == "Funtional");
            self.teamProfile = self.teamData[self.teamData.findIndex((val) => val._id == team_id)];
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
    });
  }

}