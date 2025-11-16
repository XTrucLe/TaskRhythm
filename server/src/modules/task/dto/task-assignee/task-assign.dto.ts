import { IsNotEmpty, IsOptional } from "class-validator";
import { Exclude, Expose } from "class-transformer";
import { UserSummaryDto } from "src/modules/user/dto/user-response.dto";

export class AssignTaskDto {
  @IsNotEmpty()
  userId!: string;
}

export class TaskAssigneeDto extends AssignTaskDto {
  @IsOptional()
  taskId!: string;
}

@Exclude()
export class TaskAssigneeResponseDto extends UserSummaryDto {
  @Expose() id!: string;
  @Expose() taskId!: string;
}
