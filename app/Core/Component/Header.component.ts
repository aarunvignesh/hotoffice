import {Component} from "@angular/core";
import {loginService} from "./../../Login/Service/login.service";
import { Router } from '@angular/router';

@Component({
    selector:"wse-open-office-header",
    templateUrl:"./../Views/header.component.html"
})
export class HeaderComponent{

    userData: any;
    userSubscription:any;

    constructor(private login: loginService, private router: Router){
        let self = this;
       this.userSubscription = this.login.announceSignIn.subscribe((user:any) => {self.userData=user});
       /*router.paramMap.subscribe((result: any)=>{
       		console.log(result);
       });*/
    }

    logout(){
    	this.login.logout();
    }
};