import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { TaskCommentService } from "../services/task-comment.service";
import { CurrentUser } from "../../../common/decorators/current-user.decorator";
import { User } from "../../user/entities/user.entity";
import { CreateTaskCommentDto } from "../dto/task-comment/create-task-comment.dto";
import { AuthGuard } from "@nestjs/passport";
import { TaskCommentMapper } from "../mappers/task-comment.mapper";
import { TaskCommentResponseDto } from "../dto/task-comment/task-comment-response.dto";

@Controller("tasks/:taskId/comments")
@UseGuards(AuthGuard("jwt"))
export class TaskCommentController {
  constructor(
    private readonly taskCommentService: TaskCommentService,
    private readonly taskCommentMapper: TaskCommentMapper
  ) {}

  @Post()
  async createComment(
    @Param("taskId") taskId: string,
    @CurrentUser() currentUser: User,
    @Body() dto: CreateTaskCommentDto
  ): Promise<TaskCommentResponseDto> {
    const comment = await this.taskCommentService.createComment(
      taskId,
      currentUser.id,
      dto
    );
    return this.taskCommentMapper.toDto(comment);
  }

  @Delete(":commentId")
  async deleteComment(
    @Param("taskId") taskId: string,
    @Param("commentId") commentId: string,
    @CurrentUser() currentUser: User
  ): Promise<void> {
    return this.taskCommentService.deleteComment(commentId);
  }
}
