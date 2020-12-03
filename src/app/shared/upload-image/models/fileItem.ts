import { Observable } from 'rxjs';

export class FileItem {
    public name: string;
    public uploading = false;
    public uploadPercent: Observable<number>;
    public downloadUrl: Observable<string>;
    public url: string;

    constructor(public file: File = file){
        this.name = file.name;
    }
}