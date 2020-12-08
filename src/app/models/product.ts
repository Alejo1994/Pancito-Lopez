export class Product {
    
    isNew:boolean;
    isSeason:boolean;
    isRegular:boolean;
    productDesc:string; 
    productName:string;
    productPrice:number;
    productType:string;
    state:boolean;

    constructor(){
        this.productName = '';
        this.productPrice=0;
        this.productDesc= ''; 
        this.isNew= false;
        this.isSeason= false;
        this.isRegular= false;
        this.state= true;
        this.productType='isRegular';
        
    }

}
