import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Create new product
  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  // Get all expired products



  // Get all low-stock products
  @Get('low-stock')
  getLowStock() {
    return this.productService.findAllLowStock();
  }

  // Get all products
  @Get()
  findAll() {
    return this.productService.findAll();
  }
// products.controller.ts
@Get('expired')
getExpiredProducts() {
  return this.productService.findExpired(); // DB query
}



  // Get product by SKU (after /expired and /low-stock routes!)
  @Get(':sku')
  findOne(@Param('sku') sku: string) {
    return this.productService.findOneBySku(sku);
  }

  // Update product by SKU
  @Put(':sku')
  update(@Param('sku') sku: string, @Body() dto: UpdateProductDto) {
    return this.productService.updateBySku(sku, dto);
  }

  // Delete product by SKU
  @Delete(':sku')
  remove(@Param('sku') sku: string) {
    return this.productService.deleteBySku(sku);
  }
}
