import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEye,faPlus,faSave,faTrashAlt,faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-usercart',
  templateUrl: './usercart.component.html',
  styleUrls: ['./usercart.component.css']
})
export class UsercartComponent implements OnInit {

  faEye = faEye;
  faPlus = faPlus;
  faSave = faSave;
  faTrashAlt = faTrashAlt;
  faSignOutAlt = faSignOutAlt;

  objects = [];
  products = [];
  price;
  count;

  username = localStorage.getItem("username");

  constructor(private cs :CartService,private ps :ProductService,private rt : Router) { }

  ngOnInit(): void {
    this.view();
  }

  delete(id)
  {
    this.cs.delete(id).subscribe(
      res => {
        alert(res["message"]);
        this.view();
      },
      err => alert("something went wrong")
    );
    
  }

  view()
  {
    let i=0;
    this.price = 0;
    this.cs.getdetails(this.username).subscribe(
      res => {
        this.objects = res["message"];
        this.count = this.objects.length
        this.products.length=0;
        for(i=0;i<this.objects.length;i++)
        {
          this.ps.getProductbyid(this.objects[i].id).subscribe(
            res => {
              this.products.push(res["product"]);
              let p = res["product"].price;
              this.price +=  (+p);
            }
          )
        }
      },
      err => alert("something went wrong..")
    );
  }

  logout()
  {
    localStorage.clear();
    this.rt.navigateByUrl("/home");
  }
}
