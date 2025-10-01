import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TaskPriority, TaskStatus } from "../constants/task.constant";
import { Workspace } from "src/modules/workspace/entities/workspace.entity";

@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  workspaceId!: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.tasks, {
    onDelete: "CASCADE",
  })
  workspace!: Workspace;

  @Column()
  title!: string;

  @Column({ nullable: true })
  description!: string;

  @Column({ type: "enum", enum: TaskStatus, default: TaskStatus.TODO })
  status!: TaskStatus;

  @Column({ type: "enum", enum: TaskPriority, default: TaskPriority.LOW })
  priority!: TaskPriority;

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

  @Column({ default: 0, nullable: true })
  progress?: number;

  @Column({ type: "timestamp", nullable: true })
  start_date?: Date;

  @Column({ type: "timestamp", nullable: true })
  due_date?: Date;

  @Column({ type: "timestamp", nullable: true })
  completed_at?: Date;

  @CreateDateColumn()
  created_at!: Date;
}
