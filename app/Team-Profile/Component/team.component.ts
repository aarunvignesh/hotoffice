import {Component , Input, ViewChild, OnInit} from "@angular/core";
import * as moment from "moment";
import { Http, Response } from '@angular/http';
import { ActivatedRoute, Params, Router } from "@angular/router";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'open-office-team-profile',
    templateUrl:'./../Views/team.component.html',
    styleUrls:['./../Styles/main.css']
})
export class teamProfileComponent implements OnInit{
 	
 teamData: Array<any> = [];	 
 agileTeam: Array<any> = [];
 functionalTeam: Array<any> = [];
 
constructor(private http: Http, private activatedRoute :ActivatedRoute){
   
}


ngOnInit(){
    let self = this;
    let team = this.activatedRoute.snapshot.queryParams["id"];
    this.http.get("/teams/data")
    .toPromise()
    .then((response:any)=>{
        try{
          let data = JSON.parse(response._body);
          if(data.length > 0){
            self.teamData = data;
            self.agileTeam.filter((value: any) => value.type == "Agile");
            self.functionalTeam.filter((value: any) => value.type == "Funtional");
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