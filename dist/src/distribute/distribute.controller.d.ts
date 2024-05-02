import { DistributeService } from './distribute.service';
import { DistributeRequestDto } from './dtos/distribute-request.dto';
export declare class DistributeController {
    private readonly distributeService;
    constructor(distributeService: DistributeService);
    distributeDeliveries(vehicle: string, body: DistributeRequestDto): Promise<{
        vehicle: string;
        route: any[];
    }>;
}
