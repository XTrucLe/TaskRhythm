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
  UpdateDateColumn,
} from "typeorm";
import { TaskPriority, TaskStatus, TaskType } from "../constants/task.constant";
import { Project } from "src/modules/project/entities/project.entity";
import { User } from "src/modules/user/entities/user.entity";
import { TaskComment } from "./task-comment.entity";
import { TaskAssignee } from "./task-assignee.entity";

@Entity("tasks")
@Index("idx_task_project_status", ["projectId", "status"])
@Check(`"level" >= 0 AND "level" < 3`)
@Check(`"progress" >= 0 AND "progress" <= 100`)
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  // --- 1. Thông tin Core & Quan hệ Chính ---
  @Column()
  @Index()
  projectId!: string;

  @ManyToOne(() => Project, (project) => project.tasks, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "project_id" })
  project!: Project;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: "creator_id" })
  creator!: User;

  @Column()
  title!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  // --- 2. Phân loại (Enums) ---
  @Index()
  @Column({ type: "enum", enum: TaskStatus, default: TaskStatus.TODO })
  status!: TaskStatus;

  @Column({ type: "enum", enum: TaskPriority, default: TaskPriority.LOW })
  priority!: TaskPriority;

  @Column({ type: "enum", enum: TaskType, default: TaskType.TASK })
  type!: TaskType;

  // --- 3. Cấu trúc Cây (Hierarchy) ---
  @Index()
  @Column({ default: 0 })
  level!: number;

  @Column({ type: "uuid", nullable: true })
  @Index()
  parentId?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  @Index()
  path?: string;

  // --- 4. Trạng thái & Tiến độ ---
  @Column({ type: "decimal", precision: 5, scale: 2, default: 0 })
  progress!: number;

  @Column({ type: "integer", default: 0 })
  estimatedHours!: number;

  @Column({ type: "integer", default: 0 })
  loggedHours!: number;

  // --- 5. Timestamps (Ngày tháng) ---

  @Column({ type: "timestamp", nullable: true })
  startAt?: Date;

  @Index()
  @Column({ type: "timestamp", nullable: true })
  dueDate?: Date;

  @Column({ type: "timestamp", nullable: true })
  completedAt?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // --- 6. Các Quan hệ khác (Relations) ---
  @OneToMany(() => TaskAssignee, (assignee) => assignee.task)
  assignees?: TaskAssignee[];

  @OneToMany(() => TaskComment, (comment) => comment.task)
  comments!: TaskComment[];
}
