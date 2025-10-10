import { Expose, Exclude } from "class-transformer";
import { ProjectStatsResponseDto } from "../project_stats/project-stats-response.dto";

@Exclude()
export class ProjectResponseDto {
  @Expose() id!: string;
  @Expose() name!: string;
  @Expose() description?: string;
  @Expose() workspaceId!: string;
  @Expose() creatorId!: string;
  @Expose() createdAt!: Date;
  @Expose() updatedAt!: Date;
}

@Exclude()
export class ProjectResponseWithStatsDto extends ProjectResponseDto {
  @Expose()
  stats!: ProjectStatsResponseDto;
}
