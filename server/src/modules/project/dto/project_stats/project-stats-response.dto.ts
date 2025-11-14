import { Expose, Exclude } from "class-transformer";

@Exclude()
export class ProjectStatsResponseDto {
  @Expose() totalTasks!: number;
  @Expose() completedTasks!: number;
  @Expose() pendingTasks!: number;
  @Expose() doingTasks!: number;
  @Expose() canceledTasks!: number;
  @Expose() progressRate!: number;
  @Expose() highPriorityTasks!: number;
  @Expose() mediumPriorityTasks!: number;
  @Expose() lowPriorityTasks!: number;
}
