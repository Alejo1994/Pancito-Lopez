import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  product: Product;
  file: File;

  constructor(private productService: ProductService,
    private router: Router) {
    this.product = new Product();
  }

  ngOnInit(): void {
  }

  async onUpload(forma: NgForm) {

    if (forma.invalid) {
      Object.values(forma.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    else {
      this.product.productType = forma.value.productType;
      this.getTypeProd();

      let prod: any = {
        productName: forma.value.txtProductName,
        productDesc: forma.value.txtProductDesc,
        productPrice: forma.value.txtProductPrice,
        state: true,
        isNew: this.product.isNew,
        isRegular: this.product.isRegular,
        isSeason: this.product.isSeason
      }


      await this.productService.saveProduct(this.file, prod)
        .then(() => {
          console.log('Aqui cuando resuElve');
          forma.resetForm();
          this.router.navigate(['product']);
        });
    }

  }

  getTypeProd() {
    this.product.isNew = (this.product.productType === 'isNew');
    this.product.isSeason = (this.product.productType === 'isSeason');
    this.product.isRegular = (this.product.productType === 'isRegular');
  }

  upload(event) {
    if (event.target.files[0].type.includes('image')) {
      console.log('isImage');
      this.file = event.target.files;
    }
    else{
      this.file=null;
      Swal.fire({
        icon: 'error',
        title: `Archivo invalido, debe ser una imagen`,
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

}
