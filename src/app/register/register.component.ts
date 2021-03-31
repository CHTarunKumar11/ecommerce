import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private us:UserService,private rt:Router) { }

  ngOnInit(): void {
  }

  onSubmit(formObj)
  {
    this.us.registerUser(formObj).subscribe(
      res => {
        if(res["message"] == "user successfully inserted")
        {
          alert("Registration is successfull..");
          this.rt.navigateByUrl("/login");
        }
        if(res["message"] == "user already existed")
        {
          alert("Username is taken try again with another username");
        }
      },
      err => alert("Something went wrong in registration. Try again!")
    )
  }
  
  login()
  {
    this.rt.navigateByUrl("/login");
  }
}
