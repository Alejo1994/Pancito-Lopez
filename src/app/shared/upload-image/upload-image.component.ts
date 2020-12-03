import { Component, OnInit } from '@angular/core';
import { StorageService } from './services/storage.service';
import { FileItem } from './models/fileItem';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent  implements OnInit{

  files: FileItem[] = [];
  isOverDrop = false;
  imgs: any[] = [];

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.loadImgs();
  }

  onUpload(){
    this.storageService.uploadImage(this.files);
    this.files = [];

  }

  async loadImgs(){
    (await this.storageService.getAllImgs()).subscribe( resp => {
      this.imgs = [];

      resp.forEach( element => {
        this.imgs.push(element);
      });
      console.log('imgs',this.imgs);
    });
  }
}
