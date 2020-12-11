import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, map } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private MEDIA_STORAGE_PATH = 'img';

  constructor(private storage: AngularFireStorage,
    private db: AngularFirestore) { }


  async saveProduct(item: File, prod: any) {
    console.log(item);
    console.log(prod);
    let product = {};

    const filePath = this.generateFileName(item[0].name);
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, item[0]);

    task.snapshotChanges()
      .pipe(
        finalize(async () => {
          fileRef.getDownloadURL()
            .subscribe(resp => {
              product = {
                imageName: item[0].name,
                url: resp.toString(),
                name: prod.productName,
                description: prod.productDesc,
                price: prod.productPrice,
                isNew: prod.isNew,
                isSeason: prod.isSeason,
                isRegular: prod.isRegular,
                state: prod.state
              };

              this.saveProd(product);
            });
        })
      ).subscribe();
  }

  private saveProd(product: any) {
    console.log('SaveProd',product)
    this.db.collection(`product`).add(product);
  }

  // tslint:disable-next-line: typedef
  async getAllProducts() {
    return this.db.collection(`product`).snapshotChanges()
      .pipe(map(document => {
        return document.map(doc => {
          return { id: doc.payload.doc.id, data: doc.payload.doc.data() }
        });
      }));
  }

  private generateFileName(name: string): string {
    return `${this.MEDIA_STORAGE_PATH}/${new Date().getTime()}_${name}`;
  }

  async deleteProduct(prodId: string) {
    this.db.doc(`product/${prodId}`).delete();
  }

  async updateState(docId: string, state: boolean) {
    this.db.doc(`product/${docId}`).update({
      state: state
    });
  }

  async updatePrice(docId: string, newPrice: number) {
    this.db.doc(`product/${docId}`).update({
      price: newPrice
    });
  }
}
