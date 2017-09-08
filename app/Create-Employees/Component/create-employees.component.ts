import {Component , Input, ViewChild, OnInit} from "@angular/core";
import * as moment from "moment";
import { Http, Response } from '@angular/http'
import {ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'open-office-create-employees',
    templateUrl:'./../Views/create-employees.component.html',
    styleUrls:['./../Styles/main.css']
})
export class createEmployeesComponent implements OnInit{
  page:number = 1;
  userData:any = {};
  disableNext:Boolean;
  cropperSettings:CropperSettings;
  imageReceiver:any;
  managerList: Array<any>;
  project_list: Array<String> = ["GSE","NSE","CAD","UI/UX"];

  @ViewChild('cropper', undefined) cropper:ImageCropperComponent;

  collectFields:any = {
    page1:{
      required:["profile_image"]
    },
    page2:{
      required:["emp_id","first_name","last_name"]
    },
    page3:{
      required:["email","slack","skype","phone"]
    },
    page4:{
      required:["team_details","projects_worked","reporting_manager"]
    },
    page5:{
      required:["current_projects","projects_worked","reporting_manager"]
    }
  }

  constructor(private http: Http){
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 200;
    this.cropperSettings.height = 200;

    this.cropperSettings.croppedWidth = 200;
    this.cropperSettings.croppedHeight = 200;

    this.cropperSettings.canvasWidth = 500;
    this.cropperSettings.canvasHeight = 300;

    this.cropperSettings.minWidth = 10;
    this.cropperSettings.minHeight = 10;

    this.cropperSettings.rounded = false;
    this.cropperSettings.keepAspect = false;

    this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.cropperSettings.cropperDrawSettings.strokeWidth = 2;

    this.imageReceiver = {};
  }

  ngOnInit(){
    let self = this;
    this.http.get("/users/data?designation=manager")
    .toPromise()
    .then((response:any)=>{
        try{
          let data = JSON.parse(response._body);
          if(data.length > 0){
            self.managerList = data.map((value:any)=> ({displayName: value.first_name+" "+value.last_name,_id:value._id,email: value.email}));
          }
          else{
            self.managerList = [];
          }
        }  
        catch(e){
          self.managerList = [];
        }
    },()=>{
      self.managerList = [];
    })
  }

  submit(){
    this.userData.password = this.userData.emp_id;
    this.http.post("/user",this.userData)
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

  validationForNext(){
    if(this.collectFields["page"+this.page]){
      let disableNext = false;
      for(var i=0;i<this.collectFields["page"+this.page].required.length;i++){
        
        if(!this.userData[this.collectFields["page"+this.page].required[i]]){
          return true;
        }
      }
      
    }
    return false;
  }

  cropped(){
    this.userData.profile_image = this.imageReceiver.image;
  }

  nextPage(){
    this.page += 1;
  }

  prevPage(){
    this.page -= 1;
  }
}