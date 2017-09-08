import {Component , Input, ViewChild, OnInit} from "@angular/core";
import * as moment from "moment";
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'open-office-employees',
    templateUrl:'./../Views/employees.component.html',
    styleUrls:['./../Styles/main.css']
})
export class employeesComponent implements OnInit{
 
 userData: Array<any>;

  constructor(private http: Http){
   
  }

  ngOnInit(){
    let self = this;
    this.http.get("/users/data")
    .toPromise()
    .then((response:any)=>{
        try{
          let data = JSON.parse(response._body);
          if(data.length > 0){
            self.userData = data;
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