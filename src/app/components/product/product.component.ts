import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import * as $ from 'jquery';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product: Product;

  file: File;

  newProducts: any[] = [];
  seasonProducts: any[] = [];
  regularProducts: any[] = [];

  constructor(private productService: ProductService,
              private router:Router) {
    this.product = new Product();
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  async loadProducts() {
    (await this.productService.getAllProducts())
      .subscribe(resp => {
        this.newProducts = [];
        this.seasonProducts = [];
        this.regularProducts = [];
        resp.forEach((element: any) => {
          if (element.data.isNew) {
            this.newProducts.push(element);
          }
          if (element.data.isSeason) {
            this.seasonProducts.push(element);
          }
          if (element.data.isRegular) {
            this.regularProducts.push(element);
          }
        });
      });
  }

  async deleteProduct(id: string) {
    await this.productService.deleteProduct(id);
  }

  async changeState(id: string, state: boolean) {
    await this.productService.updateState(id, state);
  }

  addProduct(){
    this.router.navigate(['product/addProduct']);
  }

}
