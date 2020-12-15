export class Product {
    
    productDesc:string; 
    productName:string;
    productPrice:number;
    productType:string;
    state:boolean;

    constructor(){
        this.productName = '';
        this.productPrice=0;
        this.productDesc= ''; 
       this.state= true;
        this.productType='isRegular';
        
    }

}
