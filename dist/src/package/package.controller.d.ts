import { CreatePackageDto } from './dtos/create-package.dto';
import { Package } from './entities/package.entity';
import { PackageService } from './package.service';
export declare class PackageController {
    private readonly packageService;
    constructor(packageService: PackageService);
    getAllPackages(): Promise<Package[]>;
    getPackageByBarcode(barcode: string): Promise<Package>;
    createPackage(body: CreatePackageDto): Promise<Package>;
    updatePackage(barcode: string, body: Partial<Package>): Promise<Package>;
    deletePackage(barcode: string): Promise<Package>;
}
