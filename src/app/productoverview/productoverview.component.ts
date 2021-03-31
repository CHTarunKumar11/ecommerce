import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { faShoppingCart,faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-productoverview',
  templateUrl: './productoverview.component.html',
  styleUrls: ['./productoverview.component.css']
})
export class ProductoverviewComponent implements OnInit {

  constructor(private ps:ProductService, private ar : ActivatedRoute,private rt : Router,private cs : CartService) { }

  product
  faShoppingCart = faShoppingCart;
  faChevronCircleLeft = faChevronCircleLeft;

  cartObj = {id : "",username : ""};

  ngOnInit(): void {

    this.ar.params.subscribe(
      params => {
        let id = params["id"];
        this.ps.getProductbyid(id).subscribe(
          res => {
            this.product = res["product"];
          },
          err => console.log("something went wrong..")
        )
      }
    )
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
        },
        err => console.log("something went wrong..")
      )
      
    }
    else
    {
      this.rt.navigateByUrl("/login");
    }
  }

  back()
  {
    this.rt.navigateByUrl("/home");
  }

}
