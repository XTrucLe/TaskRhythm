import {
  Column,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  UpdateDateColumn,
} from "typeorm";
import { Project } from "./project.entity";

@Entity("project_stats")
@Index(["project_id"], { unique: true })
export class ProjectStats {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  project_id!: string;

  @OneToOne(() => Project, (project) => project.stats, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "project_id" })
  project!: Project;

  @Column({ type: "int", default: 0 })
  total_tasks!: number;

  @Column({ type: "int", default: 0 })
  completed_tasks!: number;

  @Column({ type: "int", default: 0 })
  pending_tasks!: number;

  @Column({ type: "int", default: 0 })
  in_progress_tasks!: number;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0 })
  progress_rate!: number;

  @Column({ type: "int", default: 0 })
  high_priority_tasks!: number;

  @Column({ type: "int", default: 0 })
  medium_priority_tasks!: number;

  @Column({ type: "int", default: 0 })
  low_priority_tasks!: number;

  @UpdateDateColumn()
  updated_at!: Date;
}
