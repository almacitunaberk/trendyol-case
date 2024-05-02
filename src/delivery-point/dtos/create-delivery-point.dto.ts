import { IsNumber, IsString } from 'class-validator';

export class CreateDeliveryPointDto {
  @IsString()
  name: string;
  @IsNumber()
  value: number;
}
