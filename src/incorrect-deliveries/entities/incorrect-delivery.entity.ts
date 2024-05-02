import { Package } from 'src/package/entities/package.entity';
import { Sack } from 'src/sack/entities/sack.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class IncorrectDelivery {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  deliveryPoint: number;
  @Column({ nullable: true })
  packageBarcode: string;
  @Column({ nullable: true })
  sackBarcode: string;
  @ManyToOne(() => Package, (_package) => _package.incorrectDeliveries)
  @JoinColumn({ name: 'packageBarcode', referencedColumnName: 'barcode' })
  package: Package;
  @ManyToOne(() => Sack, (sack) => sack.incorrectDeliveries)
  @JoinColumn({ name: 'sackBarcode', referencedColumnName: 'barcode' })
  sack: Sack;
}
