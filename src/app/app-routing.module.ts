import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductoverviewComponent } from './productoverview/productoverview.component';
import { RegisterComponent } from './register/register.component';
import { UsercartComponent } from './usercart/usercart.component';

const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"register",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"usercart",component:UsercartComponent},
  {path:"admindashboard",component:AdmindashboardComponent},
  {path:"productoverview/:id",component:ProductoverviewComponent},
  {path:"",redirectTo:"home",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
