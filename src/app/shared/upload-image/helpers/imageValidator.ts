import { FileItem } from '../models/fileItem';

export class ImageValidator {
    private accptType = ['image/jpeg', 'image/png', 'image.jpg'];

    validateType(fileType: string): boolean {
        return fileType === '' || fileType === undefined ? false : this.accptType.includes(fileType);
    }

    checkDropped(fileName: string, files: FileItem[]): boolean{
        for (const file of files){
            if (fileName === fileName){
                return true;
            }
        }
        return false;
    }
}
