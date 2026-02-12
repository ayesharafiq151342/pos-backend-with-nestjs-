import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm'; // <-- make sure LessThan is imported
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // ===============================
  // 🕛 CRON JOB – Every day midnight
  // ===============================
  @Cron('0 0 * * *')
  async updateProductStatus() {
    const today = new Date();

    // Update statuses (expired, low-stock, active)
    await this.productRepository
      .createQueryBuilder()
      .update(Product)
      .set({ status: 'expired' })
      .where('expiryDate IS NOT NULL')
      .andWhere('expiryDate < :today', { today })
      .execute();

    await this.productRepository
      .createQueryBuilder()
      .update(Product)
      .set({ status: 'low-stock' })
      .where('quantity <= quantityAlert')
      .andWhere('expiryDate >= :today OR expiryDate IS NULL', { today })
      .execute();

    await this.productRepository
      .createQueryBuilder()
      .update(Product)
      .set({ status: 'active' })
      .where('quantity > quantityAlert')
      .andWhere('expiryDate >= :today OR expiryDate IS NULL', { today })
      .execute();
  }

  // ===============================
  // Pages ke liye filtered APIs
  // ===============================
  async findExpired(): Promise<Product[]> {
    const today = new Date();
    return this.productRepository.find({
      where: {
        expiryDate: LessThan(today), // only products expired before today
      },
    });
  }

  async findAllLowStock(): Promise<Product[]> {
    return this.productRepository.find({
      where: { status: 'low-stock' },
    });
  }

  async findAllActive(): Promise<Product[]> {
    return this.productRepository.find({
      where: { status: 'active' },
    });
  }

  // ===============================
  // Normal CRUD
  // ===============================
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

  async updateBySku(sku: string, dto: UpdateProductDto) {
    const product = await this.productRepository.findOne({ where: { sku } });
    if (!product) throw new NotFoundException('Product not found');
    Object.assign(product, dto);
    return this.productRepository.save(product);
  }

  async deleteBySku(sku: string): Promise<{ success: boolean }> {
    const result = await this.productRepository.delete({ sku });
    return { success: (result.affected ?? 0) > 0 };
  }
}
