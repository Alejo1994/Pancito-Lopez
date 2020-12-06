import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import * as $ from 'jquery';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productName: string;
  productPrice: number;
  productDesc: string;
  isNew = false;
  isSeason = false;
  isRegular = true;
  state = true;
  typeProd = 'isRegular';

  files: Product[] = [];
  isOverDrop = false;

  newProducts: any[] = [];
  seasonProducts: any[] = [];
  regularProducts: any[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.clearForm();
    this.loadProducts();
    this.getTypeProd();
  }

  async onUpload() {
    this.getTypeProd();
    let prod: any = {
      productName: this.productName,
      productDesc: this.productDesc,
      productPrice: this.productPrice,
      isNew: this.isNew,
      isSeason: this.isSeason,
      isRegular: this.isRegular,
      state: this.state
    }

    await this.productService.saveProduct(this.files, prod)
          .then(resp => $('#AddProductModal').hide());
  }

  async loadProducts() {
     (await this.productService.getAllProducts())
      .subscribe(resp => {
        this.newProducts=[];
        this.seasonProducts=[];
        this.regularProducts=[];
        resp.forEach((element: any) => {
          if (element.data.isNew) {
            this.newProducts.push(element);
          }
          if(element.data.isSeason){
            this.seasonProducts.push(element);
          }
          if(element.data.isRegular){
            this.regularProducts.push(element);
          }
        });
      });
  }

  clearForm() {
    this.productName = '';
    this.productDesc = '';
    this.isNew = true;
    this.isSeason = false;
    this.state = true;
    this.files = [];
  }

  getTypeProd() {
    this.isNew = (this.typeProd === 'isNew');
    this.isSeason = (this.typeProd === 'isSeason');
    this.isRegular = (this.typeProd === 'isRegular');
  }

  async deleteProduct(id: string) {
    await this.productService.deleteProduct(id);
  }

  async changeState(id: string, state: boolean) {
    await this.productService.updateState(id, state);
  }

}
