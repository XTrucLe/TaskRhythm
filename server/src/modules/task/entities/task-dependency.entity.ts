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

@Entity("task_dependencies")
export class TaskDependency {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Index()
  @Column()
  taskId!: string;

  @Index()
  @Column()
  dependsOnTaskId!: string;

  @ManyToOne(() => Task, (task) => task.dependencies, { onDelete: "CASCADE" })
  @JoinColumn({ name: "taskId" })
  task!: Task;

  @ManyToOne(() => Task, { onDelete: "CASCADE" })
  @JoinColumn({ name: "dependsOnTaskId" })
  dependsOnTask!: Task;
}
