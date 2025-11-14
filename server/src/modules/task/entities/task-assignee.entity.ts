import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Task } from "./task.entity";
import { User } from "src/modules/user/entities/user.entity";

@Entity("task_assignees")
@Index(["taskId", "assigneeId"], { unique: true })
export class TaskAssignee {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  @Index()
  taskId!: string;

  @Column()
  @Index()
  assigneeId!: string;

  @ManyToOne(() => Task, (task) => task.assignees, { onDelete: "CASCADE" })
  task!: Task;

  @ManyToOne(() => User, { nullable: false })
  assignee!: User;
}
