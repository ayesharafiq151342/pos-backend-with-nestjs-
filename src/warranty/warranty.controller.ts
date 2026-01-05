import { Controller, Post, Get, Body } from '@nestjs/common';
import { WarrantyService } from './warranty.service';
import { CreateWarrantyDto } from './dto/create-warranty.dto';

@Controller('warranty')
export class WarrantyController {
  constructor(private service: WarrantyService) {}

  @Post()
  create(@Body() dto: CreateWarrantyDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
