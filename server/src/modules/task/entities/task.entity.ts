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
import { TaskDependency } from "./task-dependency.entity";
import { Project } from "src/modules/project/entities/project.entity";
import { User } from "src/modules/user/entities/user.entity";
import { TaskComment } from "./task-comment.entity";

@Entity("tasks")
@Unique(["projectId", "title"])
@Check(`"level" >= 0 AND "level" < 3`)
@Check(`"progress" >= 0 AND "progress" <= 100`)
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  @Index()
  projectId?: string;

  @ManyToOne(() => Project, (project) => project.tasks, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "project_id" })
  project!: Project;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: "assignee_id" })
  assignee?: User;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: "creator_id" })
  creator!: User;

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

  @ManyToOne(() => Task, (task) => task.subTasks, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "parent_task_id" })
  parentTask?: Task;

  @OneToMany(() => Task, (task) => task.parentTask)
  subTasks?: Task[];

  @OneToMany(() => TaskDependency, (dependencies) => dependencies.task)
  dependencies!: TaskDependency[];

  @OneToMany(() => TaskComment, (comment) => comment.task)
  comments!: TaskComment[];

  @Column({ type: "boolean", default: false })
  isMilestone!: boolean;

  @Column({ type: "boolean", default: false })
  isBlocked!: boolean;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0 })
  progress!: number;

  @Column({ type: "timestamp", nullable: true })
  plannedStartAt?: Date;

  @Column({ type: "timestamp", nullable: true })
  startAt?: Date;

  @Column({ type: "timestamp", nullable: true })
  assignedAt?: Date;

  @Index()
  @Column({ type: "timestamp", nullable: true })
  dueDate?: Date;

  @Column({ type: "timestamp", nullable: true })
  completedAt?: Date;

  @Column({ type: "timestamp", nullable: true })
  cancelledAt?: Date;

  @CreateDateColumn()
  createdAt!: Date;
}
