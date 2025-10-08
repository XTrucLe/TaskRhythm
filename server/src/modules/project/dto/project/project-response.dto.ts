import { Expose, Exclude } from "class-transformer";
import { ProjectStatsResponseDto } from "../project_stats/project-stats-response.dto";

@Exclude()
export class ProjectResponseDto {
  @Expose() id!: string;
  @Expose() name!: string;
  @Expose() description?: string;
  @Expose() workspace_id!: string;
  @Expose() creator_id!: string;
  @Expose() created_at!: Date;
  @Expose() updated_at!: Date;
}

@Exclude()
export class ProjectResponseWithStatsDto extends ProjectResponseDto {
  @Expose()
  stats!: ProjectStatsResponseDto;
}
