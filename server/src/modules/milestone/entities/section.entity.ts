import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Milestone } from "./milestone.entity";

@Entity("sections")
export class Section {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  milestoneId!: string;

  @ManyToOne(() => Milestone, (milestone) => milestone.sections)
  milestone!: Milestone;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: "int", default: 0 })
  order!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
