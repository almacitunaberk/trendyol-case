import { DeliveryPoint } from '../../delivery-point/entities/delivery-point.entity';
import { Sack, ShipmentState } from '../../sack/entities/sack.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { IncorrectDelivery } from 'src/incorrect-deliveries/entities/incorrect-delivery.entity';

@Entity()
export class Package {
  @PrimaryColumn()
  barcode: string;
  @Column({ default: ShipmentState.Created })
  state: ShipmentState;
  @Column()
  unloadDeliveryPoint: number;
  @Column({ nullable: true })
  sackBarcode: string;
  @Column()
  desi: number;
  @ManyToOne(() => DeliveryPoint, (deliveryPoint) => deliveryPoint.packages)
  @JoinColumn({ name: 'unloadDeliveryPoint', referencedColumnName: 'value' })
  deliveryPoint: DeliveryPoint;
  @ManyToOne(() => Sack, (sack) => sack.packages)
  @JoinColumn({ name: 'sackBarcode', referencedColumnName: 'barcode' })
  belongedSack: Sack;
  @OneToMany(() => IncorrectDelivery, (incorrectDelivery) => incorrectDelivery.package)
  incorrectDeliveries: IncorrectDelivery[];
}
