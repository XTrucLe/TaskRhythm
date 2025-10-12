export enum TaskStatus {
  COMMING_SOON = "coming_soon",
  TODO = "todo",
  DOING = "doing",
  DONE = "done",
  OVERDUE = "overdue",
  DONE_LATE = "done_late",
  CANCELLED = "cancelled",
}

export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export enum TaskDependencyType {
  FINISH_TO_START = "finish_to_start",
  START_TO_START = "start_to_start",
  FINISH_TO_FINISH = "finish_to_finish",
  START_TO_FINISH = "start_to_finish",
}

export enum TaskDirection {
  BLOCKED = "blocked", // Task is blocked by another task
  BLOCKED_BY = "blocked_by", // Task is blocking another task
}
