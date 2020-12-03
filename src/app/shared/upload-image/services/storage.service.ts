import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { FileItem } from '../models/fileItem';
import { finalize, map } from 'rxjs/operators';

@Injectable()
export class StorageService {

  private MEDIA_STORAGE_PATH = 'img';

  constructor(private storage: AngularFireStorage,
              private db: AngularFirestore) { }

  async uploadImage(images: FileItem[]){
    let image = {};

    for (const item of images){
      item.uploading = true;

      const filePath = this.generateFileName(item.name);
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, item.file);

      item.uploadPercent = task.percentageChanges();
      task.snapshotChanges()
        .pipe(
          finalize( async ()  => {
            item.downloadUrl = fileRef.getDownloadURL();
            item.downloadUrl.subscribe(resp =>
              {
                image = {
                  name: item.name,
                  url: resp.toString()
                };
                this.saveImage(image);
              });
            item.uploading = false;
          })
        ).subscribe();
    }
  }

  private saveImage(image: any){
    this.db.collection(`${this.MEDIA_STORAGE_PATH}`).add(image);
  }

  // tslint:disable-next-line: typedef
  async getAllImgs(){
    return this.db.collection(`${this.MEDIA_STORAGE_PATH}`).snapshotChanges()
        .pipe(map(document => {
            return document.map(doc => {
                return {id: doc.payload.doc.id, data: doc.payload.doc.data()}
            });
        }));
  }

  private generateFileName(name: string): string{
    return `${this.MEDIA_STORAGE_PATH}/${new Date().getTime()}_${name}`;
  }
}
