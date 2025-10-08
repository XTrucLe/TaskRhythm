import { plainToClass } from "class-transformer";
import { Project } from "../entities/project.entity";
import {
  ProjectResponseDto,
  ProjectResponseWithStatsDto,
} from "../dto/project/project-response.dto";
import { ProjectStatsResponseDto } from "../dto/project_stats/project-stats-response.dto";

export class ProjectMapper {
  toDto(project: Project): ProjectResponseDto {
    return plainToClass(ProjectResponseDto, project, {
      excludeExtraneousValues: true,
    });
  }
  toDtoWithStats(project: Project): ProjectResponseWithStatsDto {
    const projectDto = plainToClass(ProjectResponseWithStatsDto, project, {
      excludeExtraneousValues: true,
    });
    if (project.stats) {
      projectDto.stats = plainToClass(ProjectStatsResponseDto, project.stats, {
        excludeExtraneousValues: true,
      });
    }
    return projectDto;
  }

  toDtosWithStats(projects: Project[]): ProjectResponseWithStatsDto[] {
    return projects.map((project) => this.toDtoWithStats(project));
  }
}
