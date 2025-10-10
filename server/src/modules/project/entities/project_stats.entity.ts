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
@Index(["projectId"], { unique: true })
export class ProjectStats {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  projectId!: string;

  @OneToOne(() => Project, (project) => project.stats, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "project_id" })
  project!: Project;

  @Column({ type: "int", default: 0 })
  totalTasks!: number;

  @Column({ type: "int", default: 0 })
  completedTasks!: number;

  @Column({ type: "int", default: 0 })
  pendingTasks!: number;

  @Column({ type: "int", default: 0 })
  inProgressTasks!: number;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0 })
  progressRate!: number;

  @Column({ type: "int", default: 0 })
  highPriorityTasks!: number;

  @Column({ type: "int", default: 0 })
  mediumPriorityTasks!: number;

  @Column({ type: "int", default: 0 })
  lowPriorityTasks!: number;

  @UpdateDateColumn()
  updatedAt!: Date;
}
