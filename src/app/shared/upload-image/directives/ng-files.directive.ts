import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/fileItem';
import { ImageValidator } from '../helpers/imageValidator';

@Directive({
  selector: '[appNgFiles]'
})
export class NgFilesDirective extends ImageValidator {

  @Input() files: FileItem[] = [];
  @Output() mouseOver: EventEmitter<boolean> = new EventEmitter();

  @HostListener('dragover', ['$event'])
  onDragEnter(event: any){
    this.preventAndStop(event);
    this.mouseOver.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(){
    this.mouseOver.emit(false);
  }

  @HostListener('drop', ['$event'])
  onDrop(event: any){
    const dataTransfer = this.getDataTransfer(event);
    if (!dataTransfer) {
      return;
    }

    this.preventAndStop(event);
    this.extractFile(dataTransfer.files);

    this.mouseOver.emit(false);

  }

  private getDataTransfer(event: any){
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private extractFile(fileList: FileList) {
      // tslint:disable-next-line: forin
      for (const property in Object.getOwnPropertyNames(fileList)){
        const tempFile = fileList[property];
        if (this.canBeUpload(tempFile)){
          const newFile = new FileItem(tempFile);
          this.files.push(newFile);
        }
      }
  }

  private canBeUpload(file: File): boolean{
    if ( !this.checkDropped(file.name, this.files) && this.validateType(file.type) ) {
        return true;
    } else {
        return false;
    }
  }

  private preventAndStop(event: any): void {
    event.preventDefault();
    event.stopPropagation();

  }


}
