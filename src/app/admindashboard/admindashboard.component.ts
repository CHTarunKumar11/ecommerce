import { Component, OnInit } from '@angular/core';
import { faEye,faPlus,faSave,faTrashAlt,faEdit,faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {

  faEye = faEye;
  faPlus = faPlus;
  faSave = faSave;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  faThumbsUp = faThumbsUp;

  products;
  myrefid;

  dummyActivity = {id:"",productname:"",modelno:"",description:"",brandName:"",price:""};

  s=true;
  sview = false;
  sadd = true;

  file:File;

  incomingFile(event){
    this.file = event.target.files[0];
  }

  formdata

  constructor(private ps:ProductService) { }

  ngOnInit(): void {
  }

  view()
  {
    this.sview = true;
    this.sadd = false;
    this.ps.getProducts().subscribe(
      res => {
        this.products = res["message"];
      },
      err => alert("something went wrong..")
    )
  }
  save(id,productname,modelno,description,brandName,price)
  {

    this.s=!this.s;
    this.dummyActivity.id = id;
    this.dummyActivity.productname = productname;
    this.dummyActivity.modelno = modelno;
    this.dummyActivity.description = description;
    this.dummyActivity.brandName = brandName;
    this.dummyActivity.price = price;

    this.formdata = new FormData();
    this.formdata.append('photo',this.file,this.file.name);
    this.formdata.append('productObj',JSON.stringify(this.dummyActivity));

    this.ps.updateProduct(this.formdata).subscribe(
      res => {
        alert(res["message"]);
        this.view();
      },
      err => {
        alert("something went wrong in updation..")
      }

    )
  }

  edit(id)
  {
    this.s=!this.s;
    this.myrefid=id;
  }

  add()
  {
    this.sview = false;
    this.sadd = true;
  }

  onSubmit(formObj)
  {
    let productObj = formObj;
    productObj.id = Date.now().toString();
    this.formdata = new FormData();
    this.formdata.append('photo',this.file,this.file.name);
    this.formdata.append('productObj',JSON.stringify(productObj));

    this.ps.addProduct(this.formdata).subscribe(
      res => {
          alert(res["message"]);
      },
      err => {
        alert("something went wrong..")
      }
    )
  }

  delete(id)
  {
    this.ps.delete(id).subscribe(
      res => {
        alert(res["message"]);
      },
      err => alert("something went wrong")
    );
    this.view();
  }

}
