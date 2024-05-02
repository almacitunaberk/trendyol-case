import { DeliveryPoint } from '../../delivery-point/entities/delivery-point.entity';
import { Package } from '../../package/entities/package.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { IncorrectDelivery } from 'src/incorrect-deliveries/entities/incorrect-delivery.entity';

export enum ShipmentState {
  Created = 1,
  LoadedIntoSack = 2,
  Loaded = 3,
  Unloaded = 4,
}

@Entity()
export class Sack {
  @PrimaryColumn()
  barcode: string;
  @Column({ default: ShipmentState.Created })
  state: ShipmentState;
  @Column()
  unloadDeliveryPoint: number;
  @ManyToOne(() => DeliveryPoint, (deliveryPoint) => deliveryPoint.sacks)
  @JoinColumn({ name: 'unloadDeliveryPoint', referencedColumnName: 'value' })
  deliveryPoint: DeliveryPoint;
  @OneToMany(() => Package, (_package) => _package.belongedSack)
  packages: Package[];
  @OneToMany(() => IncorrectDelivery, (incorrectDelivery) => incorrectDelivery.sack)
  incorrectDeliveries: IncorrectDelivery[];
}
