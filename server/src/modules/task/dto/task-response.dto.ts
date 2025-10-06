import { Exclude, Expose, Type } from "class-transformer";

@Exclude()
export class TaskResponseDto {
  @Expose() id!: string;
  @Expose() title!: string;
  @Expose() description?: string;
  @Expose() status!: string;
  @Expose() priority!: string;
  @Expose() parent_task_id?: string;
  @Expose() creator_id!: string;
  @Expose() level!: number;
  @Expose() assign_id?: string;
  @Expose() progress?: number;
  @Expose() start_date?: Date;
  @Expose() due_date?: Date;
  @Expose() completed_at?: Date;
  @Expose() createdAt!: Date;
  @Expose() updatedAt!: Date;
  @Expose() workspaceId!: string;
}

@Exclude()
export class TaskResponseWithChildDto extends TaskResponseDto {
  @Expose()
  @Type(() => TaskResponseDto)
  sub_tasks?: TaskResponseDto[];
}
