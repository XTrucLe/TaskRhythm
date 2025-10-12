import { Injectable } from "@nestjs/common";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from "typeorm";
import { Task } from "./task.entity";
import { TaskDependencyType } from "../constants/task.constant";

@Entity("task_dependencies")
@Index(["task", "dependsOnTask"], { unique: true })
export class TaskDependency {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Task, (task) => task.dependencies, { onDelete: "CASCADE" })
  @JoinColumn({ name: "taskId" })
  task!: Task;

  @ManyToOne(() => Task, { onDelete: "CASCADE" })
  @JoinColumn({ name: "dependsOnTaskId" })
  dependsOnTask!: Task;

  @Column({
    type: "enum",
    enum: TaskDependencyType,
    default: TaskDependencyType.FINISH_TO_START,
  })
  type!: TaskDependencyType;
}
