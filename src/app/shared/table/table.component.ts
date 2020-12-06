import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() products: any[] = [];


  constructor(private productService: ProductService) { }

  ngOnInit(): void {

  }

  async deleteProduct(id: string) {
    await this.productService.deleteProduct(id);
  }

  async changeState(id: string, state: boolean) {
    await this.productService.updateState(id, state);
  }

}
