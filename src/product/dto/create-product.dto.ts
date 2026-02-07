// src/product/dto/create-product.dto.ts
import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';

export class CreateProductDto {
  @IsString() productName: string;
  @IsString() slug: string;
  @IsString() barcode: string;
  @IsString() store: string;
  @IsString() warehouse: string;
  @IsString() sku: string;
  @IsString() sellingType: string;
  @IsString() category: string;
  @IsString() subcategory: string;
  @IsString() brand: string;
  @IsString() unit: string;
  @IsString() barcodeSymbology: string;
  @IsString() description: string;
  @IsString() productType: string;
  @IsNumber() quantity: number;
  @IsNumber() price: number;
  @IsString() taxType: string;
  @IsNumber() tax: number;
  @IsString() discountType: string;
  @IsNumber() discountValue: number;
  @IsNumber() quantityAlert: number;  
  @IsString() status: string;   
  @IsArray() @IsOptional() images?: string[];
  @IsOptional() warranty?: {
    warranty: string;
    manufacturer: string;
    manufacturedDate: string;
    expiryDate: string;
  };
  @IsOptional() mode?: string;
  @IsArray() @IsOptional() variants?: any[];
}

