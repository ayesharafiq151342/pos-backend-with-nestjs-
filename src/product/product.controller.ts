import { Body, Controller, Post, Get, Delete, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    console.log('Received DTO:', createProductDto); // Check incoming data
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  } 

  @Delete(':sku')
  async delete(@Param('sku') sku: string) {
    const success = await this.productService.deleteBySku(sku);
    return { success };
}
}