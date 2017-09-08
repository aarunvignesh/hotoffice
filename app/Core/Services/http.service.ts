import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import * as moment from "moment";

@Injectable()
export class httpService{
    constructor(private http: Http){

    }

    getDataForCharts(query:Object){
      
       return "";
    }
}