import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  constructor(private productService: ProductService) {
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

      let prod: any = {
        productName: forma.value.txtProductName,
        productDesc: forma.value.txtProductDesc,
        productPrice: forma.value.txtProductPrice,
        state: true,
        productType: forma.value.productType
      }


      await this.productService.saveProduct(this.file, prod)
        .then(() => {
          forma.resetForm();
        });
    }

  }

  upload(event) {
    if (event.target.files[0].type.includes('image')) {
      this.file = event.target.files;
      console.log(this.file);
    }
    else {
      this.file = null;
      Swal.fire({
        icon: 'error',
        title: `Archivo invalido, debe ser una imagen`,
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

}
