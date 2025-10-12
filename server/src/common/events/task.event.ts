export class TaskCreatedEvent {
  projectId!: string;
  creatorId!: string;
  parentTaskId?: string;
}

export class TaskUpdatedStatusEvent {
  taskId!: string;
  projectId!: string;
  oldStatus!: string;
  newStatus!: string;
  updaterId!: string;
  parentTaskId?: string;
}

export class TaskDeletedEvent {
  taskId!: string;
  projectId!: string;
  deleterId!: string;
  parentTaskId?: string;
}

export class TaskDependencyAddedEvent {
  projectId!: string;
  taskId!: string;
  dependsOnTaskId!: string;
}
