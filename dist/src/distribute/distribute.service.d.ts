import { DistributeRequestDto } from './dtos/distribute-request.dto';
import { SackService } from 'src/sack/sack.service';
import { PackageService } from 'src/package/package.service';
import { IncorrectDeliveriesService } from 'src/incorrect-deliveries/incorrect-deliveries.service';
export declare class DistributeService {
    private readonly sackService;
    private readonly packageService;
    private readonly incorrectDeliveriesService;
    constructor(sackService: SackService, packageService: PackageService, incorrectDeliveriesService: IncorrectDeliveriesService);
    distribute(content: DistributeRequestDto): Promise<{
        vehicle: string;
        route: any[];
    }>;
}
