import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ShipmentState } from 'src/sack/entities/sack.entity';

export class CreatePackageDto {
  @IsString()
  barcode: string;
  @IsNumber()
  unloadDeliveryPoint: number;
  @IsOptional()
  @IsString()
  sackBarcode: string | null;
  @IsNumber()
  desi: number;
}
