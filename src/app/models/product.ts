import { Observable } from 'rxjs';

export class Product {

    productName = '';
    productPrice=0;
    productDesc= ''; 
    isNew= false;
    isSeason= false;
    isRegular= false;
    state= true;

    imageName: string;
    uploading = false;
    uploadPercent: Observable<number>;
    downloadUrl: Observable<string>;
    url: string;

    constructor(public file: File = file){
        this.imageName = file.name;
    }
}
