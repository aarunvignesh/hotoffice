import {Component , Input, ViewChild, OnInit} from "@angular/core";
import * as moment from "moment";
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'open-office-team-profile',
    templateUrl:'./../Views/team.component.html',
    styleUrls:['./../Styles/main.css']
})
export class teamProfileComponent implements OnInit{
 	
 teamData: Array<any>;	 
 
constructor(private http: Http){
   
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
    });
  }

}