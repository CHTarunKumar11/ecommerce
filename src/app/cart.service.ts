import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  count;
  constructor(private hc : HttpClient) { }

  addtocart(obj):Observable<any>
  {
    return this.hc.post("/cart/add",obj);
  }
  getdetails(username):Observable<any>
  {
    return this.hc.get("cart/useritems/"+username);
  }
  delete(id):Observable<any>
  {
    return this.hc.delete("cart/delete/"+id);
  }

}
