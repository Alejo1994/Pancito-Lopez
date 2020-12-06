import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private MEDIA_STORAGE_PATH = 'img';
  private productLis: Observable<any>;

  constructor(private storage: AngularFireStorage,
    private db: AngularFirestore) { }

  async saveProduct(images: Product[],
    prod: any) {
    let product = {};

    for (const item of images) {
      item.uploading = true;

      const filePath = this.generateFileName(item.imageName);
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, item.file);

      item.uploadPercent = task.percentageChanges();
      task.snapshotChanges()
        .pipe(
          finalize(async () => {
            item.downloadUrl = fileRef.getDownloadURL();
            item.downloadUrl.subscribe(resp => {
              product = {
                imageName: item.imageName,
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
            item.uploading = false;
          })
        ).subscribe();
    }
  }

  private saveProd(product: any) {
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

}
