import { Exclude, Expose, Transform, Type } from "class-transformer";
import {
  TaskPriority,
  TaskStatus,
  TaskType,
} from "../../constants/task.constant";
import { UserSummaryResponseDto } from "src/modules/user/dto/user-summary-response.dto";

@Exclude()
export class TaskResponseDto {
  @Expose() id!: string;
  @Expose() projectId!: string;
  @Expose() title!: string;
  @Expose() description?: string;
  @Expose() status!: TaskStatus;
  @Expose() priority!: TaskPriority;
  @Expose() type!: TaskType;
  @Expose() level!: number;
  @Expose() parentId?: string;
  @Expose() path?: string;
  @Expose() isBlocked!: boolean;
  @Expose() progress!: number;
  @Expose() estimatedHours!: number;
  @Expose() loggedHours!: number;
  @Expose() startAt?: Date;
  @Expose() dueDate?: Date;
  @Expose() completedAt?: Date;
  @Expose() createdAt!: Date;
  @Expose() updatedAt!: Date;
  @Expose() commentsCount?: number;

  @Expose()
  @Type(() => UserSummaryResponseDto)
  creator!: UserSummaryResponseDto;

  @Expose()
  @Transform(({ obj }) =>
    obj.assignees?.map((a: any) => ({
      id: a.assignee.id,
      name: a.assignee.fullName,
      avatarUrl: a.assignee.avatarUrl,
    }))
  )
  assignees?: UserSummaryResponseDto[];
}
