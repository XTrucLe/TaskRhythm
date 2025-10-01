import { Exclude, Expose } from "class-transformer";

@Exclude()
export class TaskResponseDto {
  @Expose() id!: string;
  @Expose() title!: string;
  @Expose() description?: string;
  @Expose() status!: string;
  @Expose() priority!: string;
  @Expose() parent_task_id?: string;
  @Expose() assign_id?: string;
  @Expose() creator_id!: string;
  @Expose() progress?: number;
  @Expose() start_date?: Date;
  @Expose() due_date?: Date;
  @Expose() completed_at?: Date;
  @Expose() createdAt!: Date;
  @Expose() updatedAt!: Date;
  @Expose() workspaceId!: string;
}
