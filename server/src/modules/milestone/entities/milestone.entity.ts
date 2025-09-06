import { Workspace } from "src/modules/workspace/entities/workspace.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Section } from "./section.entity";
import { MilestoneHistory } from "./milestone-history.entity";
import { MilestoneStatus } from "../constants/milestone.constant";

@Entity("milestones")
export class Milestone {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  workspaceId!: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.milestones, {
    onDelete: "CASCADE",
  })
  workspace!: Workspace;

  @Column()
  name!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "date", nullable: true })
  startDate?: Date;

  @Column({ type: "date", nullable: true })
  dueDate?: Date;

  @Column({ default: "active" })
  status!: MilestoneStatus;

  @Column({ type: "int", default: 0 })
  order!: number;

  @OneToMany(() => Section, (section) => section.milestone, { cascade: true })
  sections!: Section[];

  @OneToMany(() => MilestoneHistory, (history) => history.milestone, {
    cascade: true,
  })
  history!: MilestoneHistory[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
