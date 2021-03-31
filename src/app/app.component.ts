import { Component, OnDestroy, OnInit } from '@angular/core';
import { faShoppingCart,faTruck,faHome,faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { faInstagram,faTelegram,faLinkedinIn,faTwitter,faYoutube,faFacebook} from '@fortawesome/free-brands-svg-icons';
import { ProductService } from './product.service';
import { Router } from '@angular/router';
import { CartService } from './cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ecommerceapp';
  faShoppingCart = faShoppingCart;
  faTruck = faTruck;
  faLinkedinIn = faLinkedinIn;
  faTwitter = faTwitter;
  faYoutube = faYoutube;
  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faTelegram = faTelegram;
  faHome =faHome;
  faSignInAlt = faSignInAlt;

  count

  constructor(private ps:ProductService,private rt : Router,private cs : CartService) { }

  ngOnInit()
  {
  }

  gotocart()
  {
    let username = localStorage.getItem("username");
    if(username)
    {
      this.rt.navigateByUrl("/usercart");
    }
    else
    {
      this.rt.navigateByUrl("/login");
    }
  }

  
  
}
