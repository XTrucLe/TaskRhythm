import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TaskComment } from "../entities/task-comment.entity";
import { CreateTaskCommentDto } from "../dto/task-comment/create-task-comment.dto";
import { TaskQueryService } from "./task-query.service";

@Injectable()
export class TaskCommentService {
  constructor(
    @InjectRepository(TaskComment)
    private readonly taskCommentRepository: Repository<TaskComment>,
    private readonly taskQueryService: TaskQueryService
  ) {}

  async createComment(
    taskId: string,
    userId: string,
    dto: CreateTaskCommentDto
  ): Promise<TaskComment> {
    const { content, parentCommentId } = dto;
    const task = await this.taskQueryService.findById(taskId);

    let parentComment: TaskComment | null = null;

    if (parentCommentId) {
      parentComment = await this.taskCommentRepository.findOne({
        where: { id: parentCommentId, task: { id: taskId } },
      });
      if (!parentComment) {
        throw new NotFoundException(
          "Parent comment not found or does not belong to this task"
        );
      }
    }

    const comment = this.taskCommentRepository.create({
      content,
      task,
      author: { id: userId },
      parentComment: parentComment || undefined,
    });

    return this.taskCommentRepository.save(comment);
  }

  async getCommentsByTaskId(taskId: string): Promise<TaskComment[]> {
    return this.taskCommentRepository.find({
      where: { task: { id: taskId } },
      relations: ["author", "replies", "replies.author"],
      order: { createdAt: "ASC" },
    });
  }

  async deleteComment(commentId: string): Promise<void> {
    const result = await this.taskCommentRepository.delete({ id: commentId });
    if (result.affected === 0) {
      throw new NotFoundException("Comment not found");
    }
  }
}
