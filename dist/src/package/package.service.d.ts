import { SackService } from '../../src/sack/sack.service';
import { Repository } from 'typeorm';
import { Package } from './entities/package.entity';
export declare class PackageService {
    private readonly repository;
    private readonly sackService;
    constructor(repository: Repository<Package>, sackService: SackService);
    create(barcode: string, unloadDeliveryPoint: number, sackBarcode: string | null, desi: number): Promise<Package>;
    findAll(): Promise<Package[]>;
    findOne(barcode: string): Promise<Package>;
    getPackageByBarcode(barcode: string): Promise<Package>;
    loadPackage(barcode: string): Promise<Package>;
    unloadPackageInSack(barcode: string): Promise<Package>;
    unloadIndividualPackage(barcode: string): Promise<Package>;
    unloadPackageWithSack(barcode: string): Promise<void>;
    update(barcode: string, attrs: Partial<Package>): Promise<Package>;
    remove(barcode: string): Promise<Package>;
}
