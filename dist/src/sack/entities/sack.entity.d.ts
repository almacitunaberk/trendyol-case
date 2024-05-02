import { DeliveryPoint } from '../../delivery-point/entities/delivery-point.entity';
import { Package } from '../../package/entities/package.entity';
import { IncorrectDelivery } from 'src/incorrect-deliveries/entities/incorrect-delivery.entity';
export declare enum ShipmentState {
    Created = 1,
    LoadedIntoSack = 2,
    Loaded = 3,
    Unloaded = 4
}
export declare class Sack {
    barcode: string;
    state: ShipmentState;
    unloadDeliveryPoint: number;
    deliveryPoint: DeliveryPoint;
    packages: Package[];
    incorrectDeliveries: IncorrectDelivery[];
}
