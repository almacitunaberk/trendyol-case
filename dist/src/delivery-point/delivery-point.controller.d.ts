import { DeliveryPointService } from './delivery-point.service';
import { CreateDeliveryPointDto } from './dtos/create-delivery-point.dto';
export declare class DeliveryPointController {
    private readonly deliveryPointService;
    constructor(deliveryPointService: DeliveryPointService);
    getAllDeliveryPoints(): Promise<import("./entities/delivery-point.entity").DeliveryPoint[]>;
    getDeliveryPointByValue(value: number): Promise<import("./entities/delivery-point.entity").DeliveryPoint>;
    createDeliveryPoint(body: CreateDeliveryPointDto): Promise<import("./entities/delivery-point.entity").DeliveryPoint>;
    deleteDeliveryPoint(value: number): Promise<import("./entities/delivery-point.entity").DeliveryPoint>;
}
