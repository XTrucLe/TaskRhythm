import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProjectStats } from "../entities/project_stats.entity";

@Injectable()
export class ProjectStatsService {
  constructor(
    @InjectRepository(ProjectStats)
    private projectStatsRepository: Repository<ProjectStats>
  ) {}

  async createProjectStats(projectId: string): Promise<ProjectStats> {
    const projectStats = this.projectStatsRepository.create({ projectId });
    return this.projectStatsRepository.save(projectStats);
  }

  async getProjectStats(projectId: string): Promise<ProjectStats | null> {
    return this.projectStatsRepository.findOne({ where: { projectId } });
  }

  async incrementTaskCount(projectId: string): Promise<void> {
    await this.projectStatsRepository.increment({ projectId }, "totalTasks", 1);
  }

  async decrementTaskCount(projectId: string): Promise<void> {
    await this.projectStatsRepository.decrement({ projectId }, "totalTasks", 1);
  }
}
