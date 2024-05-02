import { IsString } from 'class-validator';

export class DeliveryBarcode {
  @IsString()
  barcode: string;
}
