import { Repository } from 'typeorm';
import { DeliveryPoint } from './entities/delivery-point.entity';
export declare class DeliveryPointService {
    private readonly repository;
    constructor(repository: Repository<DeliveryPoint>);
    create(name: string, value: number): Promise<DeliveryPoint>;
    findAll(): Promise<DeliveryPoint[]>;
    findOne(value: number): Promise<DeliveryPoint>;
    remove(value: number): Promise<DeliveryPoint>;
}
