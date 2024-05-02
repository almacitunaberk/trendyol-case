import { Package } from '../../package/entities/package.entity';
import { Sack } from '../../sack/entities/sack.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class DeliveryPoint {
  @PrimaryColumn()
  value: number;
  @Column()
  name: string;
  @OneToMany(() => Sack, (sack) => sack.deliveryPoint)
  sacks: Sack[];
  @OneToMany(() => Package, (_package) => _package.deliveryPoint)
  packages: Package[];
}
