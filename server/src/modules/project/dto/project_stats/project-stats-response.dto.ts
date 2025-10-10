import { Expose, Exclude } from "class-transformer";

@Exclude()
export class ProjectStatsResponseDto {
  @Expose() totalTasks!: number;
  @Expose() completedTasks!: number;
  @Expose() pendingTasks!: number;
  @Expose() inProgressTasks!: number;
  @Expose() progressRate!: number;
  @Expose() highPriorityTasks!: number;
  @Expose() mediumPriorityTasks!: number;
  @Expose() lowPriorityTasks!: number;
}
