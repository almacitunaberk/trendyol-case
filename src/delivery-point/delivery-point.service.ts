import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliveryPoint } from './entities/delivery-point.entity';

@Injectable()
export class DeliveryPointService {
  constructor(@InjectRepository(DeliveryPoint) private readonly repository: Repository<DeliveryPoint>) {}

  create(name: string, value: number) {
    let deliveryPoint = this.repository.create({ name, value });
    return this.repository.save(deliveryPoint);
  }
  findAll() {
    return this.repository.find({ relations: { sacks: true, packages: true } });
  }

  async findOne(value: number) {
    let deliveryPoint = await this.repository.findOne({ relations: { sacks: true, packages: true }, where: { value } });
    if (!deliveryPoint) {
      throw new NotFoundException('Delivery Point not found!');
    }
    return deliveryPoint;
  }
  async remove(value: number) {
    let deliveryPoint = await this.repository.findOne({ where: { value } });
    if (!deliveryPoint) {
      throw new NotFoundException('Delivery Point not found!');
    }
    return await this.repository.remove(deliveryPoint);
  }
}
