import { Product } from '../models/product';

export class ImageValidator {
    private accptType = ['image/jpeg', 'image/png', 'image.jpg'];

    validateType(fileType: string): boolean {
        return fileType === '' || fileType === undefined ? false : this.accptType.includes(fileType);
    }

    checkDropped(imageName: string, files: Product[]): boolean{
        for (const file of files){
            if (imageName === file.imageName){
                return true;
            }
        }
        return false;
    }
}
