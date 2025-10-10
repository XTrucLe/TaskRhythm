import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ProjectService } from "./project.service";
import { EmitterEvent } from "../../../common/constants/emitter.constant";
import { WorkspaceCreatedEvent } from "src/common/events/workspace.event";
import { TaskCreatedEvent } from "src/common/events/task.event";
import { ProjectStatsService } from "./project-stats.service";

@Injectable()
export class ProjectEventHandlerService {
  constructor(
    private readonly projectService: ProjectService,
    private readonly projectStatsService: ProjectStatsService
  ) {}

  @OnEvent(EmitterEvent.WORKSPACE_CREATED)
  async handleWorkspaceCreatedEvent(payload: WorkspaceCreatedEvent) {
    this.projectService.createProject(payload.workspaceId, payload.ownerId, {
      name: "Default Project",
      description: "This is the default project",
    });
  }

  @OnEvent(EmitterEvent.PROJECT_CREATED)
  async handleProjectCreatedEvent(payload: { projectId: string }) {
    if (!payload.projectId) return;
    await this.projectStatsService.createProjectStats(payload.projectId);
  }

  @OnEvent(EmitterEvent.TASK_CREATED)
  async handleTaskCreatedEvent(payload: TaskCreatedEvent) {
    if (!payload.projectId) return;

    await this.projectStatsService.incrementTaskCount(payload.projectId);
  }
}
