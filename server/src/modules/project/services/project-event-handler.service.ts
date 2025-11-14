import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ProjectService } from "./project.service";
import { ProjectStatsService } from "./project-stats.service";
import { EmitterEvent } from "../../../common/constants/emitter.constant";
import { WorkspaceCreatedEvent } from "src/common/events/workspace.event";
import { TaskCreatedEvent } from "src/common/events/task.event";

@Injectable()
export class ProjectEventHandlerService {
  constructor(
    private readonly projectService: ProjectService,
    private readonly projectStatsService: ProjectStatsService
  ) {}

  // --- Workspace Created --- //
  @OnEvent(EmitterEvent.WORKSPACE_CREATED)
  async handleWorkspaceCreatedEvent(payload: WorkspaceCreatedEvent) {
    await this.projectService.createProject(
      payload.workspaceId,
      payload.ownerId,
      {
        name: "Default Project",
        description: "This is the default project",
      }
    );
  }

  // --- Project Created --- //
  @OnEvent(EmitterEvent.PROJECT_CREATED)
  async handleProjectCreatedEvent(payload: { projectId: string }) {
    if (!payload.projectId) return;
    await this.projectStatsService.createProjectStats(payload.projectId);
  }

  // --- Task Created --- //
  @OnEvent(EmitterEvent.TASK_CREATED)
  async handleTaskCreatedEvent(payload: TaskCreatedEvent) {
    if (!payload.projectId) return;

    // Tăng totalTasks + status count + recalc progress
    await this.projectStatsService.updateTaskCounts(
      payload.projectId,
      undefined,
      payload.status,
      1
    );
    await this.projectStatsService.updateTaskPriorityCount(
      payload.projectId,
      payload.priority || "low",
      1
    );
  }

  // --- Task Deleted --- //
  @OnEvent(EmitterEvent.TASK_DELETED)
  async handleTaskDeletedEvent(payload: {
    projectId: string;
    status?: string;
    priority?: string;
  }) {
    if (!payload.projectId) return;

    await this.projectStatsService.updateTaskCounts(
      payload.projectId,
      payload.status,
      undefined,
      -1
    );
    await this.projectStatsService.updateTaskPriorityCount(
      payload.projectId,
      payload.priority || "low",
      -1
    );
  }

  // --- Task Status Updated --- //
  @OnEvent(EmitterEvent.TASK_STATUS_UPDATED)
  async handleTaskStatusUpdatedEvent(payload: {
    projectId: string;
    oldStatus: string;
    newStatus: string;
  }) {
    if (!payload.projectId) return;

    await this.projectStatsService.updateTaskCounts(
      payload.projectId,
      payload.oldStatus,
      payload.newStatus
    );
  }

  // --- Task Progress Changed --- //
  @OnEvent(EmitterEvent.TASK_PROGRESS_CHANGED)
  async handleTaskProgressChangedEvent(payload: {
    projectId: string;
    parentId?: string;
  }) {
    const { projectId, parentId } = payload;

    if (!parentId) {
      await this.projectStatsService.calculateProjectProgress(projectId);
    }
  }

  @OnEvent(EmitterEvent.TASK_PRIORITY_CHANGED)
  async handleTaskPriorityChangedEvent(payload: {
    projectId: string;
    oldPriority: string;
    newPriority: string;
  }) {
    if (!payload) return;
    const { projectId, oldPriority, newPriority } = payload;

    await this.projectStatsService.updateTaskPriorityCount(
      projectId,
      oldPriority,
      -1
    );
    await this.projectStatsService.updateTaskPriorityCount(
      projectId,
      newPriority,
      1
    );
  }
}
