// src/product/entities/product.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column()
  sku: string;

  @Column()
  productName: string;

  @Column()
  slug: string;

  @Column()
  barcode: string;

  @Column()
  store: string;

  @Column()
  warehouse: string;

  @Column()
  sellingType: string;

  @Column()
  category: string;

  @Column()
  subcategory: string;

  @Column()
  brand: string;

  @Column()
  unit: string;

  @Column()
  barcodeSymbology: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  productType: string;

  @Column('int', { default: 0 })
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  price: number;

  @Column()
  taxType: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  tax: number;

  @Column()
  discountType: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  discountValue: number;

  @Column('int', { default: 10 })
  quantityAlert: number;

  @Column('simple-array', { nullable: true })
  images?: string[];

  @Column('json', { nullable: true })
  warranty?: {
    warranty: string;
    manufacturer: string;
    manufacturedDate: string;
    expiryDate: string;
  };

  @Column({ nullable: true })
  mode?: string;

  @Column('json', { nullable: true })
  variants?: any[];
}
