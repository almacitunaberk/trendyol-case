import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShipmentState } from '../../src/sack/entities/sack.entity';
import { SackService } from '../../src/sack/sack.service';
import { Repository } from 'typeorm';
import { Package } from './entities/package.entity';

@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(Package) private readonly repository: Repository<Package>,
    @Inject(forwardRef(() => SackService))
    private readonly sackService: SackService
  ) {}

  async create(barcode: string, unloadDeliveryPoint: number, sackBarcode: string | null, desi: number) {
    if (sackBarcode) {
      const sack = await this.sackService.findOne(sackBarcode);
      if (!sack) {
        throw new BadRequestException('Provided sack barcode does not belong to a sack!');
      }
      if (sack.unloadDeliveryPoint !== unloadDeliveryPoint) {
        throw new BadRequestException('Packages can only be assigned to sacks with the same delivery point!');
      }
    }
    const _package = this.repository.create({ barcode, unloadDeliveryPoint, sackBarcode, desi });
    return this.repository.save(_package);
  }

  findAll() {
    return this.repository.find({ relations: { deliveryPoint: true, belongedSack: true, incorrectDeliveries: true } });
  }

  async findOne(barcode: string) {
    let _package = await this.repository.findOne({
      relations: { deliveryPoint: true, belongedSack: true, incorrectDeliveries: true },
      where: { barcode },
    });
    if (!_package) {
      throw new NotFoundException('Package not found!');
    }
    return _package;
  }

  async getPackageByBarcode(barcode: string) {
    let _package = await this.repository.findOne({
      relations: { deliveryPoint: true, belongedSack: true },
      where: { barcode },
    });
    return _package;
  }

  async loadPackage(barcode: string) {
    const _package = await this.repository.findOne({ where: { barcode } });
    if (!_package) {
      throw new NotFoundException('Package not found!');
    }
    _package.state = ShipmentState.Loaded;
    await this.repository.save(_package);
    return _package;
  }

  async unloadPackageInSack(barcode: string) {
    let _package = await this.repository.findOne({
      relations: { belongedSack: true },
      where: { barcode },
    });
    if (!_package) {
      throw new NotFoundException('Package not found!');
    }
    _package.state = ShipmentState.Unloaded;
    await this.repository.save(_package);
    if (_package.sackBarcode) {
      await this.sackService.belongingPackageUnloaded(_package.sackBarcode);
    }
    return _package;
  }

  async unloadIndividualPackage(barcode: string) {
    let _package = await this.repository.findOne({ where: { barcode } });
    if (!_package) {
      throw new NotFoundException('Package not found!');
    }
    _package.state = ShipmentState.Unloaded;
    await this.repository.save(_package);
    return _package;
  }

  async unloadPackageWithSack(barcode: string) {
    let _package = await this.repository.findOne({ where: { barcode } });
    if (!_package) {
      throw new BadRequestException('Package not found!');
    }
    _package.state = ShipmentState.Unloaded;
    await this.repository.save(_package);
  }

  async update(barcode: string, attrs: Partial<Package>) {
    let _package = await this.repository.findOne({
      relations: { deliveryPoint: true, belongedSack: true },
      where: { barcode },
    });
    if (!_package) {
      throw new NotFoundException('Package not found!');
    }
    Object.assign(_package, attrs);
    return await this.repository.save(_package);
  }

  async remove(barcode: string) {
    let _package = await this.repository.findOne({ where: { barcode } });
    if (!_package) {
      throw new NotFoundException('Package not found!');
    }
    return this.repository.remove(_package);
  }
}
