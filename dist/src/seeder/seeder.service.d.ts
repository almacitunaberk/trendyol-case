import { DeliveryPointService } from 'src/delivery-point/delivery-point.service';
import { PackageService } from 'src/package/package.service';
import { SackService } from 'src/sack/sack.service';
export declare class SeederService {
    private readonly deliveryPointService;
    private readonly sackService;
    private readonly packageService;
    constructor(deliveryPointService: DeliveryPointService, sackService: SackService, packageService: PackageService);
    seed(): Promise<void>;
}
