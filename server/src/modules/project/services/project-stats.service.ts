import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProjectStats } from "../entities/project_stats.entity";

@Injectable()
export class ProjectStatsService {
  private statusMap: Record<string, keyof ProjectStats> = {
    done: "completedTasks",
    done_late: "completedTasks",
    doing: "doingTasks",
    coming_soon: "pendingTasks",
    todo: "pendingTasks",
    canceled: "canceledTasks",
  };

  private priorityMap: Record<string, keyof ProjectStats> = {
    high: "highPriorityTasks",
    medium: "mediumPriorityTasks",
    low: "lowPriorityTasks",
  };

  constructor(
    @InjectRepository(ProjectStats)
    private readonly projectStatsRepository: Repository<ProjectStats>
  ) {}

  // --- Create / Get --- //
  async createProjectStats(projectId: string): Promise<ProjectStats> {
    const projectStats = this.projectStatsRepository.create({ projectId });
    return this.projectStatsRepository.save(projectStats);
  }

  async getProjectStats(projectId: string): Promise<ProjectStats | null> {
    return this.projectStatsRepository.findOne({ where: { projectId } });
  }

  // --- Increment / Decrement totalTasks --- //
  async incrementTotalTasks(projectId: string, delta: number = 1) {
    if (delta <= 0) return;
    await this.projectStatsRepository.increment(
      { projectId },
      "totalTasks",
      delta
    );
  }

  async decrementTotalTasks(projectId: string, delta: number = 1) {
    if (delta <= 0) return;
    await this.projectStatsRepository.decrement(
      { projectId },
      "totalTasks",
      delta
    );
  }

  // --- Increment / Decrement status count --- //
  async updateTaskStatusCount(
    projectId: string,
    status: string,
    delta: number
  ): Promise<void> {
    const field = this.statusMap[status];
    if (!field || delta === 0) return;

    if (delta > 0) {
      await this.projectStatsRepository.increment({ projectId }, field, delta);
    } else {
      await this.projectStatsRepository.decrement({ projectId }, field, -delta);
    }
  }

  // --- Update task counts + progress together --- //
  async updateTaskCounts(
    projectId: string,
    oldStatus?: string,
    newStatus?: string,
    deltaTotal: number = 0
  ): Promise<void> {
    // Update totalTasks
    if (deltaTotal > 0) await this.incrementTotalTasks(projectId, deltaTotal);
    else if (deltaTotal < 0)
      await this.decrementTotalTasks(projectId, -deltaTotal);

    // Update status counts
    if (oldStatus) await this.updateTaskStatusCount(projectId, oldStatus, -1);
    if (newStatus) await this.updateTaskStatusCount(projectId, newStatus, 1);

    // Recalculate progress
    await this.calculateProjectProgress(projectId);
  }

  async updateTaskPriorityCount(
    projectId: string,
    priority: string,
    delta: number
  ): Promise<void> {
    const field = this.priorityMap[priority];
    if (!field || delta === 0) return;
    if (delta > 0) {
      await this.projectStatsRepository.increment({ projectId }, field, delta);
    } else {
      await this.projectStatsRepository.decrement({ projectId }, field, -delta);
    }
  }

  // --- Calculate progress --- //
  async calculateProjectProgress(projectId: string): Promise<void> {
    const stats = await this.getProjectStats(projectId);
    if (!stats) return;

    stats.progressRate =
      stats.totalTasks > 0
        ? (stats.completedTasks / stats.totalTasks) * 100
        : 0;

    await this.projectStatsRepository.save(stats);
  }
}
