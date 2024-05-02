import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PackageService } from '../../src/package/package.service';
import { Repository } from 'typeorm';
import { Sack, ShipmentState } from './entities/sack.entity';

@Injectable()
export class SackService {
  constructor(
    @InjectRepository(Sack) private readonly repository: Repository<Sack>,
    @Inject(forwardRef(() => PackageService))
    private readonly packageService: PackageService
  ) {}

  create(barcode: string, unloadDeliveryPoint: number) {
    let sack = this.repository.create({ barcode, unloadDeliveryPoint });
    return this.repository.save(sack);
  }

  findAll() {
    return this.repository.find({ relations: { deliveryPoint: true, packages: true, incorrectDeliveries: true } });
  }

  async findOne(barcode: string) {
    let sack = await this.repository.findOne({
      relations: { deliveryPoint: true, packages: true },
      where: { barcode },
    });
    if (!sack) {
      throw new NotFoundException('Sack not found!');
    }
    return sack;
  }

  async getSackByBarcode(barcode: string) {
    let sack = await this.repository.findOne({
      relations: { packages: true, deliveryPoint: true, incorrectDeliveries: true },
      where: { barcode },
    });
    if (!sack) {
      return null;
    }
    return sack;
  }

  async update(barcode: string, attrs: Partial<Sack>) {
    let sack = await this.repository.findOne({ where: { barcode } });
    if (!sack) {
      throw new NotFoundException('Sack not found!');
    }
    Object.assign(sack, attrs);
    return this.repository.save(sack);
  }

  async loadSack(barcode: string) {
    let sack = await this.repository.findOne({ where: { barcode } });
    if (!sack) {
      throw new NotFoundException('Sack not found!');
    }
    sack.state = ShipmentState.Loaded;
    await this.repository.save(sack);
    return sack;
  }

  async belongingPackageUnloaded(barcode: string) {
    const sack = await this.repository.findOne({ relations: { packages: true }, where: { barcode } });
    if (!sack) {
      throw new NotFoundException('Sack not found!');
    }
    if (sack.packages.every((p) => p.state === ShipmentState.Unloaded)) {
      sack.state = ShipmentState.Unloaded;
      await this.repository.save(sack);
    }
  }

  async unloadSack(barcode: string) {
    const sack = await this.repository.findOne({ relations: { packages: true }, where: { barcode } });
    if (!sack) {
      throw new BadRequestException('Sack is not found!');
    }
    sack.state = ShipmentState.Unloaded;
    await this.repository.save(sack);
    const packageBarcodes = sack.packages.map((p) => p.barcode);
    for (let barcode of packageBarcodes) {
      await this.packageService.unloadPackageWithSack(barcode);
    }
    return sack;
  }

  async remove(barcode: string) {
    let sack = await this.repository.findOne({ where: { barcode } });
    if (!sack) {
      throw new NotFoundException('Sack not found!');
    }
    return await this.repository.remove(sack);
  }
}
