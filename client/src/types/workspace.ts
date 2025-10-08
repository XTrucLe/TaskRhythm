export type Workspace = {
  id: string;
  name: string;
  role: string;
  description?: string;
  milestones: number;
  totalTasks: number;
  taskAssigned: number;
  taskCompleted: number;
  progress: number; // %
};
