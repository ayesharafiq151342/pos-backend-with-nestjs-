import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Warranty } from './entities/warranty.entity';
import { CreateWarrantyDto } from './dto/create-warranty.dto';

@Injectable()
export class WarrantyService {
  constructor(
    @InjectRepository(Warranty)
    private warrantyRepository: Repository<Warranty>, // ✅ repository injection
  ) {}

  create(dto: CreateWarrantyDto) {
    const warranty = this.warrantyRepository.create(dto);
    return this.warrantyRepository.save(warranty);
  }

  findAll() {
    return this.warrantyRepository.find();
  }
}
