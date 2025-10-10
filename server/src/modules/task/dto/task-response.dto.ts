import { Exclude, Expose, Type } from "class-transformer";

@Exclude()
export class TaskResponseDto {
  @Expose() id!: string;
  @Expose() title!: string;
  @Expose() description?: string;
  @Expose() status!: string;
  @Expose() priority!: string;
  @Expose() parentTaskId?: string;
  @Expose() creatorId!: string;
  @Expose() level!: number;
  @Expose() isBlocked?: boolean;
  @Expose() assignId?: string;
  @Expose() progress?: number;
  @Expose() startDate?: Date;
  @Expose() dueDate?: Date;
  @Expose() completedAt?: Date;
  @Expose() createdAt!: Date;
  @Expose() updatedAt!: Date;
}

@Exclude()
export class TaskResponseWithChildDto extends TaskResponseDto {
  @Expose()
  @Type(() => TaskResponseDto)
  subTasks?: TaskResponseDto[];
}
