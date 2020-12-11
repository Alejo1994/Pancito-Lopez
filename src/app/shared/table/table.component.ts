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
      cancelButtonText:'Cancelar'
    }).then(async(result) => {
      if (result.isConfirmed) {
        await this.productService.deleteProduct(id).then(()=>  Swal.fire('Producto eliminado', '', 'success'));
       
      } 
    })
    
  }

  async changeState(id: string, state: boolean) {

    await this.productService.updateState(id, state).then(()=>{
      if(state){
        Swal.fire({
          icon: 'success',
          title: 'Producto activado',
          showConfirmButton: false,
          timer: 1500
        })
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Producto inactivado',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
  }

  async updatePrice(id: string){
   Swal.fire({
      title: 'Ingrese el nuevo precio',
      input: 'number',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText:'Cancelar'
      
    }).then(async(result) => {
      await this.productService.updatePrice(id,result.value).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'El precio se ha actualizado',
          showConfirmButton: false,
          timer: 1500
        })
      })
    })
  }

}
