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
import { WorkspaceMember } from "src/modules/workspace/entities/workspace-member.entity";
import { User } from "src/modules/user/entities/user.entity";

@Entity("projects")
@Unique(["workspace_id", "name"])
export class Project {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  workspace_id!: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.projects, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "workspace_id" })
  workspace!: Workspace;

  @Column()
  creator_id!: string;

  @ManyToOne(() => User, { onDelete: "SET NULL" })
  @JoinColumn({ name: "creator_id" })
  creator!: User;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => Task, (task) => task.project)
  tasks!: Task[];

  @OneToOne(() => ProjectStats, (stats) => stats.project, {
    cascade: true,
  })
  stats!: ProjectStats;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
