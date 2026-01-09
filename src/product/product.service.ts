import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
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
async deleteBySku(sku: string): Promise<boolean> {
  const result = await this.productRepository.delete({ sku });
  // ✅ safely check affected
  return (result.affected ?? 0) > 0;
}async updateBySku(sku: string, updateData: Partial<Product>) {
  const result = await this.productRepository.update(
    { sku },
    updateData,
  );

  if (!result.affected || result.affected === 0) {
    return { success: false, message: 'Product not found' };
  }

  return { success: true };
}


}

