import {Component, OnInit} from "@angular/core";
import {loginService} from "./../../Login/Service/login.service";
@Component({
    selector: 'ticket-app',
    templateUrl: './../Views/app.component.html',
    styleUrls:['./../Styles/index.css', './../Styles/flexboxgrid.css']
})
export class AppComponent implements OnInit{
    fromDate:Date;
    toDate:Date;

    constructor(private login: loginService){
       
    };

    ngOnInit(){
        this.login.checkStatus();
    }
}