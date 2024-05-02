import { DeliveryPoint } from '../../delivery-point/entities/delivery-point.entity';
import { Sack, ShipmentState } from '../../sack/entities/sack.entity';
import { IncorrectDelivery } from 'src/incorrect-deliveries/entities/incorrect-delivery.entity';
export declare class Package {
    barcode: string;
    state: ShipmentState;
    unloadDeliveryPoint: number;
    sackBarcode: string;
    desi: number;
    deliveryPoint: DeliveryPoint;
    belongedSack: Sack;
    incorrectDeliveries: IncorrectDelivery[];
}
