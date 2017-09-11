import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, MdNativeDateModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ImageCropperComponent} from 'ng2-img-cropper';

import { employeesComponentProfile } from './Employee-Profile/Component/employees.component';
import { teamProfileComponent } from './Team-Profile/Component/team.component';


// import { homeComponent } from "./Home/Component/home.component";
import { AppComponent } from "./Core/Component/App.component";
import { HeaderComponent } from "./Core/Component/header.component";

import { employeesComponent } from "./Employees/Component/employees.component";
import { teamComponent } from "./Team/Component/team.component";
import { createEmployeesComponent } from "./Create-Employees/Component/create-employees.component";
import { createTeamComponent } from "./Create-Teams/Component/create-teams.component";

import { loginComponent } from "./Login/Component/login.component";
import { httpService } from "./Core/Services/http.service";
import { loginService } from "./Login/Service/login.service";

const Route: Routes = [
    {
        path:'employees',
        component: employeesComponent
    },
    {
        path:'teams',
        component: teamComponent
    },
    {
        path:'create-employees',
        component: createEmployeesComponent,
        canActivate:[loginService]
    },
    {
        path:'create-teams',
        component: createTeamComponent,
        canActivate:[loginService]
    },
    {
        path:'employee-profile',
        component: employeesComponentProfile
    },
    {
        path:'team-profile',
        component: teamProfileComponent
    },
    {
        path:'login',
        component: loginComponent,
        canActivate:[loginService]
    },
    {
        path:'',
        redirectTo:'/login',
        pathMatch: 'full'
    }
];

@NgModule({
    imports:[
       BrowserModule,
       BrowserAnimationsModule,
       MaterialModule,
       FlexLayoutModule,
       HttpModule,
       MdNativeDateModule,
       FormsModule,
       ReactiveFormsModule,
       RouterModule.forRoot(Route)
    ],
    declarations:[
        // homeComponent,
        employeesComponent,
        teamComponent,
        createEmployeesComponent,
        createTeamComponent,
        loginComponent,
        AppComponent,
        ImageCropperComponent,
        teamProfileComponent,
        employeesComponentProfile,
        HeaderComponent
    ],
    providers:[
        httpService,
        loginService
    ],
    bootstrap:[
        AppComponent
    ]
})
export class AppModule{

}