import { Expose, Exclude } from "class-transformer";

@Exclude()
export class ProjectStatsResponseDto {
  @Expose() total_tasks!: number;
  @Expose() completed_tasks!: number;
  @Expose() pending_tasks!: number;
  @Expose() in_progress_tasks!: number;
  @Expose() progress_rate!: number;
  @Expose() high_priority_tasks!: number;
  @Expose() medium_priority_tasks!: number;
  @Expose() low_priority_tasks!: number;
}
