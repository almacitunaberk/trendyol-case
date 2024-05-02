import { Package } from 'src/package/entities/package.entity';
import { Sack } from 'src/sack/entities/sack.entity';
export declare class IncorrectDelivery {
    id: number;
    deliveryPoint: number;
    packageBarcode: string;
    sackBarcode: string;
    package: Package;
    sack: Sack;
}
