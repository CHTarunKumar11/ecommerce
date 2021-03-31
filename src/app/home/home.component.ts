import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faShoppingCart,faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { from } from 'rxjs';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  faShoppingCart = faShoppingCart;
  faEye = faEye;
  faSignOutAlt = faSignOutAlt;

  username = localStorage.getItem("username");
  
  products;
  count = 0;
  objects = [];

  cartObj = {id : "",username : ""};

  constructor(private ps:ProductService,private rt : Router,private cs : CartService) { }

  ngOnInit(): void {
    this.ps.getProducts().subscribe(
      res => {
        this.products = res["message"];
      },
      err => console.log("something went wrong..")
    )
    this.getcartsize();

  }

  viewProduct(id)
  {
    this.rt.navigate(["/productoverview",id]);
  }

  logout()
  {
    localStorage.clear();
    this.username = localStorage.getItem("username");
  }

  addtocart(id)
  {
    let username = localStorage.getItem("username");
    if(username)
    {
      this.cartObj.id=id;
      this.cartObj.username=username;
      this.cs.addtocart(this.cartObj).subscribe(
        res => {
          alert(res["message"]);
          this.getcartsize();
        },
        err => alert("something went wrong..")
      )
    }
    else
    {
      this.rt.navigateByUrl("/login");
    }
  }

  getcartsize()
  {
    this.cs.getdetails(this.username).subscribe(
      res => {
        this.count = res["message"].length;
      }
    );
  }

  gotocart()
  {
    this.rt.navigateByUrl("/usercart");
  }
  

}
