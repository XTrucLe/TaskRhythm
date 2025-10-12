import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";
import { Task } from "./task.entity";
import { User } from "src/modules/user/entities/user.entity";

@Entity("task_comments")
export class TaskComment {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Task, (task) => task.comments, { onDelete: "CASCADE" })
  @JoinColumn({ name: "task_id" })
  task!: Task;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: "author_id" })
  author!: User;

  @Column({ type: "text" })
  content!: string;

  @ManyToOne(() => TaskComment, (comment) => comment.replies, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "parent_comment_id" })
  parentComment?: TaskComment;

  @OneToMany(() => TaskComment, (comment) => comment.parentComment)
  replies!: TaskComment[];

  @CreateDateColumn()
  createdAt!: Date;
}
