export class ProjectCreatedEvent {
  projectId!: string;
  creatorId!: string;
  workspaceId!: string;
}

export class ProjectUpdatedEvent {
  projectId!: string;
  updaterId!: string;
  workspaceId!: string;
}

export class ProjectDeletedEvent {
  projectId!: string;
  deleterId!: string;
  workspaceId!: string;
}
