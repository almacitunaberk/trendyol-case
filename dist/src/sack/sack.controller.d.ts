import { CreateSackDto } from './dtos/create-sack.dto';
import { Sack } from './entities/sack.entity';
import { SackService } from './sack.service';
export declare class SackController {
    private readonly sackService;
    constructor(sackService: SackService);
    getAllSacks(): Promise<Sack[]>;
    getSackByBarcode(barcode: string): Promise<Sack>;
    createSack(body: CreateSackDto): Promise<Sack>;
    updateSack(barcode: string, body: Partial<Sack>): Promise<Sack>;
    deleteSack(barcode: string): Promise<Sack>;
}
