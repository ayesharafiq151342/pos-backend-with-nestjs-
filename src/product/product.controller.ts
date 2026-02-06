// src/product/product.controller.ts
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':sku')
  findOne(@Param('sku') sku: string) {
    return this.productService.findOneBySku(sku);
  }

  @Put(':sku')
  update(@Param('sku') sku: string, @Body() dto: UpdateProductDto) {
    return this.productService.updateBySku(sku, dto);
  }

  @Delete(':sku')
  remove(@Param('sku') sku: string) {
    return this.productService.deleteBySku(sku);
  }
}
