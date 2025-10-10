import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { EmitterEvent } from "../../../common/constants/emitter.constant";
import { ProjectCreatedEvent } from "src/common/events/project.event";
import { WorkspaceService } from "./workspace.service";

@Injectable()
export class WorkspaceEventHandlerService {
  constructor(
    private readonly workspaceService: WorkspaceService,
    private emitter: EventEmitter2
  ) {}

  @OnEvent(EmitterEvent.PROJECT_CREATED)
  async handleProjectCreatedEvent(payload: ProjectCreatedEvent) {
    this.workspaceService.incrementWorkspaceStats(
      payload.workspaceId,
      "totalProject",
      1
    );
  }

  @OnEvent(EmitterEvent.PROJECT_DELETED)
  async handleProjectDeletedEvent(payload: ProjectCreatedEvent) {
    this.workspaceService.incrementWorkspaceStats(
      payload.workspaceId,
      "totalProject",
      -1
    );
  }
}
