import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private hc:HttpClient) { }

  addProduct(productObj):Observable<any>
  {
    return this.hc.post("product/addproduct",productObj);
  }
  getProducts():Observable<any>
  {
    return this.hc.get("product/getproducts");
  }
  getProductbyid(id):Observable<any>
  {
    return this.hc.get("product/getproductbyid/"+id);
  }
  updateProduct(productObj):Observable<any>
  {
    return this.hc.put("product/updateproduct",productObj);
  }
  delete(id):Observable<any>
  {
    return this.hc.delete("product/deleteproduct/"+id);
  }

}
