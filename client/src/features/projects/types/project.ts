export type ProjectStatus =
  | "PLANNING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "ON_HOLD";

export interface Project {
  id: string;
  workspace_id: string;
  creator_id: string;
  project_lead_id: string;

  name: string;
  description: string;
  status: ProjectStatus;
  start_date?: string;
  end_date?: string;
  total_tasks: number;
  completed_tasks: number;
  pending_tasks: number;
  in_progress_tasks: number;
  progress_rate: number;
  high_priority_tasks: number;
  medium_priority_tasks: number;
  low_priority_tasks: number;

  created_at: string;
  updated_at: string;
}
