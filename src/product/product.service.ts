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

  // Create a new product
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  // Get all products
  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  // Get product by SKU
  async findOneBySku(sku: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { sku } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  // Update product by SKU
  async updateBySku(sku: string, dto: UpdateProductDto) {
    const product = await this.productRepository.findOne({ where: { sku } });
    if (!product) throw new NotFoundException('Product not found');

    Object.assign(product, dto);
    return this.productRepository.save(product);
  }

  // Delete product by SKU
  async deleteBySku(sku: string): Promise<{ success: boolean }> {
    const result = await this.productRepository.delete({ sku });
    return { success: (result.affected ?? 0) > 0 };
  }

  // Get all expired products → warranty.expiryDate < today
async findExpired(): Promise<Product[]> {
  return this.productRepository
    .createQueryBuilder('product')
    .where('product.expiryDate < :today', { today: new Date() })
    .getMany();
}


  // Get all low-stock products → quantity <= quantityAlert
  async findAllLowStock(): Promise<Product[]> {
    return this.productRepository
      .createQueryBuilder('product')
      .where('product.quantity <= product.quantityAlert')
      .getMany();
  }
}
