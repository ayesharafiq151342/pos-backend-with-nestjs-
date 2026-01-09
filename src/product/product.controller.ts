// product.controller.ts
import { Body, Controller, Post, Get, Delete, Param, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() dto: CreateProductDto): Promise<Product> {
    console.log('Received DTO:', dto);
    return this.productService.create(dto);
  }

  @Get()
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }
// ✅ UPDATE PRODUCT
@Put(':sku')
update(
  @Param('sku') sku: string,
  @Body() updateData: Partial<Product>,
) {
  return this.productService.updateBySku(sku, updateData);
}

  @Delete(':sku')
  async delete(@Param('sku') sku: string) {
    const success = await this.productService.deleteBySku(sku);
    return { success };
  }
}