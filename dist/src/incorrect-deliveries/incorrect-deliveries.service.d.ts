import { Repository } from 'typeorm';
import { IncorrectDelivery } from './entities/incorrect-delivery.entity';
export declare class IncorrectDeliveriesService {
    private readonly repository;
    constructor(repository: Repository<IncorrectDelivery>);
    create(deliveryPoint: number, packageBarcode: string | null, sackBarcode: string | null): Promise<IncorrectDelivery>;
}
