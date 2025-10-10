import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";
import { Workspace } from "src/modules/workspace/entities/workspace.entity";
import { Task } from "src/modules/task/entities/task.entity";
import { ProjectStats } from "./project_stats.entity";
import { User } from "src/modules/user/entities/user.entity";
import { ProjectStatus } from "../constants/project.constant";

@Entity("projects")
@Unique(["workspaceId", "name"])
export class Project {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  workspaceId!: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.projects, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "workspace_id" })
  workspace!: Workspace;

  @Column()
  creatorId!: string;

  @ManyToOne(() => User, { onDelete: "SET NULL" })
  @JoinColumn({ name: "creator_id" })
  creator!: User;

  @ManyToOne(() => User, { onDelete: "SET NULL" })
  @JoinColumn({ name: "project_lead_id" })
  projectLead!: User;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({
    type: "enum",
    enum: ProjectStatus,
    default: ProjectStatus.PLANNING,
  })
  status!: ProjectStatus;

  @OneToMany(() => Task, (task) => task.project)
  tasks!: Task[];

  @OneToOne(() => ProjectStats, (stats) => stats.project, {
    cascade: true,
  })
  stats!: ProjectStats;

  @Column({ type: "date", nullable: true })
  startDate?: string;

  @Column({ type: "date", nullable: true })
  endDate?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
