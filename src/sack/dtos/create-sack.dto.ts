import { IsNumber, IsString } from 'class-validator';

export class CreateSackDto {
  @IsString()
  barcode: string;
  @IsNumber()
  unloadDeliveryPoint: number;
}
