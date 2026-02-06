// src/product/product.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOneBySku(sku: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { sku } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async updateBySku(sku: string, updateData: UpdateProductDto) {
    const result = await this.productRepository.update({ sku }, updateData);
    if (!result.affected || result.affected === 0) {
      throw new NotFoundException('Product not found');
    }
    return this.findOneBySku(sku);
  }

  async deleteBySku(sku: string): Promise<{ success: boolean }> {
    const result = await this.productRepository.delete({ sku });
    return { success: (result.affected ?? 0) > 0 };
  }
}
