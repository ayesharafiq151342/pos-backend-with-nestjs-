import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {

 @PrimaryGeneratedColumn()
 id: number;

 @Column()
 productName:string

 @Column()
 slug:string

 @Column()
 barcode:string

 @Column()
 store:string

 @Column()
 warehouse:string

 @Column()
 sku:string

 @Column()
 sellingType:string

 @Column()
 category:string

 @Column()
 subcategory:string

 @Column()
 brand:string

 @Column()
 unit:string

 @Column()
 barcodeSymbology:string

 @Column()
 description:string

 @Column()
 productType:string

 @Column()
 quantity:number

 @Column()
 price:number

 @Column()
 taxType:string

 @Column()
 tax:number

 @Column()
 discountType:string

 @Column()
 discountValue:number

 @Column()
 quantityAlert:number

 @Column({ type:"json", nullable:true })
 images:string[];

 @Column({ type:"json", nullable:true })
 warranty:any;

 @Column({ nullable:true })
 mode:string;

 @Column({ type:"json", nullable:true })
 variants:any[];

}
