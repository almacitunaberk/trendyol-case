import { PackageService } from '../../src/package/package.service';
import { Repository } from 'typeorm';
import { Sack } from './entities/sack.entity';
export declare class SackService {
    private readonly repository;
    private readonly packageService;
    constructor(repository: Repository<Sack>, packageService: PackageService);
    create(barcode: string, unloadDeliveryPoint: number): Promise<Sack>;
    findAll(): Promise<Sack[]>;
    findOne(barcode: string): Promise<Sack>;
    getSackByBarcode(barcode: string): Promise<Sack>;
    update(barcode: string, attrs: Partial<Sack>): Promise<Sack>;
    loadSack(barcode: string): Promise<Sack>;
    belongingPackageUnloaded(barcode: string): Promise<void>;
    unloadSack(barcode: string): Promise<Sack>;
    remove(barcode: string): Promise<Sack>;
}
