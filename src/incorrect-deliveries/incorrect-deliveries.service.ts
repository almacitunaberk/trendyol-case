import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IncorrectDelivery } from './entities/incorrect-delivery.entity';

@Injectable()
export class IncorrectDeliveriesService {
  constructor(@InjectRepository(IncorrectDelivery) private readonly repository: Repository<IncorrectDelivery>) {}

  async create(deliveryPoint: number, packageBarcode: string | null, sackBarcode: string | null) {
    const incorrectDelivery = this.repository.create({ deliveryPoint, packageBarcode, sackBarcode });
    return await this.repository.save(incorrectDelivery);
  }
}
