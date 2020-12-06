import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private productService: ProductService) { }

  products:any[]=[];
  newProducts: any [] = [];
  seasonProducts: any [] = [];
  regularProducts: any [] = [];

  ngOnInit(): void {
    this.loadProducts();
  }

  async loadProducts(){
    (await this.productService.getAllProducts())
    .subscribe(resp => {
      this.newProducts=[];
      this.seasonProducts=[];
      this.regularProducts=[];
      resp.forEach((element: any) => {
        if (element.data.isNew && element.data.state) {
          this.newProducts.push(element);
        }
        if(element.data.isSeason && element.data.state){
          this.seasonProducts.push(element);
        }
        if(element.data.isRegular && element.data.state){
          this.regularProducts.push(element);
        }
      });
    });
  }

}
