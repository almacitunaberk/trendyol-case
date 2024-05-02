import { IsArray, IsNumber } from 'class-validator';
import { DeliveryBarcode } from './delivery-barcode.dto';

export class Delivery {
  @IsNumber()
  deliveryPoint: number;
  @IsArray()
  deliveries: [DeliveryBarcode];
}
