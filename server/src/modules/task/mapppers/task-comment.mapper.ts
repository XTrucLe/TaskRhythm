import { plainToInstance } from "class-transformer";
import { TaskComment } from "../entities/task-comment.entity";
import { TaskCommentResponseDto } from "../dto/task-comment/task-comment-response.dto";

export class TaskCommentMapper {
  toDto(entity: TaskComment): TaskCommentResponseDto {
    return plainToInstance(TaskCommentResponseDto, {
      ...entity,
      authorName: entity.author.fullName,
      replies: entity.replies ? this.toDtos(entity.replies) : [],
    });
  }
  toDtos(entities: TaskComment[]): TaskCommentResponseDto[] {
    return entities.map((entity) => this.toDto(entity));
  }
}
