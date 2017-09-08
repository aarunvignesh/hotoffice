import {Component} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/toPromise";
import { Router } from '@angular/router';
import { loginService } from "./../Service/login.service"

@Component({
    selector: 'login-app',
    templateUrl: './../Views/login.component.html'
})
export class loginComponent{
    username: String;
    password: String;

    constructor(private http: Http, private login: loginService, private router: Router){
       
    };

    not_member(){
        this.router.navigate(["teams"]);
    }

    signIn(){
        let self = this;
        this.http.post("/authenticate",{
                username: this.username,
                password: this.password
        })
        .toPromise()
        .then((response:any)=>{
            try{
                let body = JSON.parse(response._body);
                self.login.setAuthData(body.user);
            }
            catch(e){

            }
        },
        (response:any)=>{
            console.log(response);
        });
    }
}