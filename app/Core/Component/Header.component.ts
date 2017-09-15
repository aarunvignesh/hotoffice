import {Component,OnInit} from "@angular/core";
import {loginService} from "./../../Login/Service/login.service";
import { Router, ActivatedRoute, ResolveEnd } from '@angular/router';

@Component({
    selector:"wse-open-office-header",
    templateUrl:"./../Views/header.component.html"
})
export class HeaderComponent implements OnInit{

    userData: any;
    userSubscription:any;
    hideHeader: any;
    hideRouteForTeams:Boolean = true;

    constructor(private login: loginService, private router: Router, private route: ActivatedRoute){
        let self = this;
       this.userSubscription = this.login.announceSignIn.subscribe((user:any) => {self.userData=user});
       /*router.paramMap.subscribe((result: any)=>{
       		console.log(result);
       });*/
    }

    ngOnInit(){
        var self = this;
        this.router.events.subscribe((event)=>{
            if(event instanceof ResolveEnd){
            self.hideHeader = true;
              if(event.state.url == "/login"){
                self.hideHeader = false;
              }
              if(event.state.url == "/teams" || event.state.url == "/employees"){
                self.hideRouteForTeams = false;
              }
              else{
                self.hideRouteForTeams = true;
              }
            }
        });
    }

    gotoProfile(){
        this.router.navigate(["employee-profile"],{queryParams:{id: this.userData._id}});
    }

    logout(){
    	this.login.logout();
    }
};