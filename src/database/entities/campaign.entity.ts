import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Brand } from './brand.entity';

@Entity()
export class Campaign {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @Column('simple-array', { nullable: true })
  activeHours: number[]; // E.g., [9, 10, 11] for 9am to 11am

  @ManyToOne(() => Brand, (brand) => brand.campaigns)
  brand: Brand;
}
