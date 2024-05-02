import { Package } from '../../package/entities/package.entity';
import { Sack } from '../../sack/entities/sack.entity';
export declare class DeliveryPoint {
    value: number;
    name: string;
    sacks: Sack[];
    packages: Package[];
}
