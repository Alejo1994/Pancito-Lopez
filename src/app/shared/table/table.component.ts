import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

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
    console.log('delete product')
    Swal.fire({
      title: '¿Quieres eliminar el producto?',
      showCancelButton: true,
      confirmButtonText: `Si`,
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.productService.deleteProduct(id).then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Producto eliminado',
            showConfirmButton: false,
            timer: 1500
          })
        });

      }
    })

  }

  async changeState(id: string, state: boolean) {

    await this.productService.updateState(id, state).then(() => {
      if (state) {
        Swal.fire({
          icon: 'success',
          title: 'Producto activado',
          showConfirmButton: false,
          timer: 1500
        })
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Producto inactivado',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
  }

  async updatePrice(id: string) {
    Swal.fire({
      title: 'Ingrese el nuevo precio',
      input: 'number',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'

    }).then(async (result) => {
      await this.productService.updatePrice(id, result.value).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'El precio se ha actualizado',
          showConfirmButton: false,
          timer: 1500
        })
      })
    })
  }

  async changeDesc(id: string, currentDesc: string) {

    Swal.fire({
      title: 'Ingrese la nueva descripción',
      input: 'textarea',
      inputValue: currentDesc,
      inputAttributes: {
        autocapitalize: 'off'
      },
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'

    }).then(async (result) => {
      await this.productService.updateDesc(id, result.value).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'La descripción se ha actualizado',
          showConfirmButton: false,
          timer: 1500
        })
      })
    })

  }

  async changeProductType(id: string, currentType: string) {

    Swal.fire({
      title: 'Seleccione el tipo',
      input: 'select',
      inputOptions:{
        'isNew':'Nuevo',
        'isRegular':'Regular',
        'isSeason':'Temporada'
      },
      inputValue:currentType,
      inputAttributes: {
        autocapitalize: 'off'
      },
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'

    }).then(async (result) => {
      await this.productService.updateProductType(id, result.value).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'El producto se ha actualizado',
          showConfirmButton: false,
          timer: 1500
        })
      })
    })

  }

  async changeName(id: string, currentName: string){
    Swal.fire({
      title: 'Ingrese el nuevo nombre',
      input: 'text',
      inputValue: currentName,
      inputAttributes: {
        autocapitalize: 'off'
      },
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'

    }).then(async (result) => {
      await this.productService.updateName(id, result.value).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'El nombre se ha actualizado',
          showConfirmButton: false,
          timer: 1500
        })
      })
    })

  }

}
