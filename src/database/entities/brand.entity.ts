import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Campaign } from './campaign.entity';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  dailyBudget: number;

  @Column()
  monthlyBudget: number;

  @Column({ default: 0 })
  dailySpend: number;

  @Column({ default: 0 })
  monthlySpend: number;

  @OneToMany(() => Campaign, (campaign) => campaign.brand, { cascade: true })
  campaigns: Campaign[];

  @Column({ default: new Date().toISOString() })
  lastReset: string; // For tracking daily/monthly resets
}
