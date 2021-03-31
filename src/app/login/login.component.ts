import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private us:UserService,private rt:Router) { }

  ngOnInit(): void {
  }

  onSubmit(formObj)
  {
    if(formObj.username == "admin" && formObj.password == "admin")
    {
      this.rt.navigateByUrl("/admindashboard");
    }
    else{
      this.us.loginUser(formObj).subscribe(
        res => {
          if(res["message"] == "success")
          {
            localStorage.setItem("token",res["signedToken"]);
            localStorage.setItem("username",res["username"]);
            this.rt.navigateByUrl("/home");
          }
          else{
            alert(res["message"]);
          }
        },
        err=>{
          alert("something went wrong..");
        }
      )
    }
    
  }

  register()
  {
    this.rt.navigateByUrl("/register");
  }

}
