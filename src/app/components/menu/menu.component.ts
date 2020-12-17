import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  productType: string;
  title: string;
  products: any[] = [];

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) {
      console.log('constructor');
    this.products = [];

    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.ngOnInit();
        this.loadProducts();
      }
    });

  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.products = [];
    this.productType = this.route.snapshot.paramMap.get("productType");
    switch (this.productType) {
      case 'isNew':
        this.title = 'Productos Nuevos';
        break;
      case 'isSeason':
        this.title = 'Productos de Temporada'
        break;
      case 'isRegular':
        this.title = 'Productos Regulares'
        break;
    }
  }

  async loadProducts() {
    console.log('loadProducts');
    Swal.fire({
      title: 'Por favor espere!',
      html: 'Cargando...',
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading()
      },
    });

    this.products = [];
    (await this.productService.getAllProducts())
      .subscribe(resp => {
        resp.forEach((element: any) => {
          if (element.data.productType === this.productType && element.data.state) {
            this.products.push(element);
          }
        });
        Swal.close();
      });
  }

}
