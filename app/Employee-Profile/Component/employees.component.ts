import {Component , Input, ViewChild, OnInit} from "@angular/core";
import * as moment from "moment";
import { Http, Response } from '@angular/http';
import { ActivatedRoute, Params, Router } from "@angular/router";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'open-office-employees-profile',
    templateUrl:'./../Views/employees.component.html',
    styleUrls:['./../Styles/main.css']
})
export class employeesComponentProfile implements OnInit{
 
  userData: Object;
  noDataAvailable: Boolean;
  constructor(private http: Http, private activatedRoute :ActivatedRoute, private route: Router){
    this.noDataAvailable = false;
  };

  ngOnInit(){
  
    let userId = this.activatedRoute.snapshot.queryParams["id"];
    
    if(userId){
        let self = this;
        this.http.get("/users/"+userId)
        .toPromise()
        .then((response:any)=>{
            try{
              let data = JSON.parse(response._body);
              self.userData = data;
            }  
            catch(e){
              self.noDataAvailable = true;
            }
        },()=>{
          self.noDataAvailable = true;
        })
    }
    else{
        this.noDataAvailable = true;
    }
 };

prevPage() {
  this.route.navigate(['employees']);
}

}