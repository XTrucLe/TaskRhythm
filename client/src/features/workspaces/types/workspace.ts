export type Workspace = {
  id: string;
  name: string;
  logo_url?: string;
  total_members?: number;
  total_project?: number;
  description?: string;
  milestones: number;
  totalTasks: number;
  taskAssigned: number;
  taskCompleted: number;
  isOwner: boolean;
  progress: number; // %
};
