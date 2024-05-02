import { IsArray, IsString } from 'class-validator';
import { Delivery } from './delivery.dto';

export class DistributeRequestDto {
  @IsString()
  vehicle: string;
  @IsArray()
  route: [Delivery];
}
