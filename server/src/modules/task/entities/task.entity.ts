import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { TaskPriority, TaskStatus } from "../constants/task.constant";
import { Workspace } from "src/modules/workspace/entities/workspace.entity";
import { TaskDependency } from "./task-dependency.entity";
import { Project } from "src/modules/project/entities/project.entity";

@Entity("tasks")
@Unique(["workspace_id", "title"])
@Check(`"level" >= 0 AND "level" < 3`)
@Check(`"progress" >= 0 AND "progress" <= 100`)
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  workspace_id!: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.tasks, {
    onDelete: "CASCADE",
  })
  workspace!: Workspace;

  @Column({ nullable: true })
  @Index()
  project_id?: string;

  @ManyToOne(() => Project, (project) => project.tasks, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "project_id" })
  project!: Project;

  @Column()
  title!: string;

  @Column({ nullable: true })
  description!: string;

  @Index()
  @Column({ type: "enum", enum: TaskStatus, default: TaskStatus.TODO })
  status!: TaskStatus;

  @Column({ type: "enum", enum: TaskPriority, default: TaskPriority.LOW })
  priority!: TaskPriority;

  @Index()
  @Column({ default: 0 })
  level!: number;

  @ManyToOne(() => Task, (task) => task.sub_tasks, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "parent_task_id" })
  parent_task?: Task;

  @OneToMany(() => Task, (task) => task.parent_task)
  sub_tasks?: Task[];

  @Column({ nullable: true })
  assign_id?: string;

  @Column()
  creator_id!: string;

  @Column({ type: "boolean", default: false })
  isBlocked?: boolean;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0 })
  progress?: number;

  @OneToMany(() => TaskDependency, (dependencies) => dependencies.task)
  dependencies!: TaskDependency[];

  @Column({ type: "timestamp", nullable: true })
  start_planned?: Date;

  @Column({ type: "timestamp", nullable: true })
  start_at?: Date;

  @Column({ type: "timestamp", nullable: true })
  assign_at?: Date;

  @Index()
  @Column({ type: "timestamp", nullable: true })
  due_date?: Date;

  @Column({ type: "timestamp", nullable: true })
  completed_at?: Date;

  @Column({ type: "timestamp", nullable: true })
  cancelled_at?: Date;

  @CreateDateColumn()
  created_at!: Date;
}
