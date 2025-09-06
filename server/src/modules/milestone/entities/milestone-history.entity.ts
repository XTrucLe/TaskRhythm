import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Milestone } from './milestone.entity';

@Entity('milestone_history')
export class MilestoneHistory {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  milestoneId!: string;

  @ManyToOne(() => Milestone, milestone => milestone.history)
  milestone!: Milestone;

  @Column()
  actorId!: string; // User id who made the change

  @Column()
  actionType!: string; // e.g., 'update', 'create', 'delete', 'status_change'

  @Column({ type: 'json', nullable: true })
  previousValue?: any;

  @Column({ type: 'json', nullable: true })
  newValue?: any;

  @CreateDateColumn()
  createdAt!: Date;
}
