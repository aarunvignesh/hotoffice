
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class loginService implements CanActivate {

    isAuthenticated: Boolean;
    userData: any;
    announceSignIn: EventEmitter<any> = new EventEmitter();

    rolesAllowedOnlyForAdmin : Array<String> = ["/create-teams"];

    constructor(private http: Http, private router: Router) {
    };


    checkStatus(){
        let self = this;
        this.http.get("/status").toPromise().then((response: any)=>{
            try{
                var data = JSON.parse(response._body);
                if(data.code == 200 && data.user){
                    self.setAuthData(data.user);
                }
            }
            catch(e){

            }
        },()=>{
            self.userData = null;
        });
    };

    setAuthData(userObject:any){
        this.userData = userObject;
        this.announceSignIn.emit(this.userData);
        if(userObject){
            this.router.navigate(['employees']);
        }
        else{
            this.router.navigate(['login']);
        }
    }

    getAuthData(userObject:any){
        if(this.userData)
        return this.userData;
        else
        return false;
    }

    logout(){
        var self = this;
        this.http.get("/logout").toPromise().then((response: any)=>{
            try{
                var data = JSON.parse(response._body);
                if(data.code == 200){
                    self.setAuthData(null);
                }
            }
            catch(e){

            }
        },()=>{
            self.userData = null;
        });
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(this.userData){
            if(this.userData.role == "admin" && state.url != "/login"){
                return true;
            }
            else if(this.userData.role == "employee" && this.rolesAllowedOnlyForAdmin.indexOf(state.url) == -1 && state.url != "/login"){
                return true;
            }
            else{
                this.router.navigate(['employees']);
            }
        }
        else{
             if(state.url == "/login"){
                return true;
            }
            else{
                this.router.navigate(['login']);
            }
        }
    };

    
}