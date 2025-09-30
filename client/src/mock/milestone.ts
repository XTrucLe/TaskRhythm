type MilestoneProps = {
  id: string;
  workspaceId: string;
  name: string;
  description: string;
  startDate: string;
  dueDate: string;
  order: number;
  status: "active" | "completed" | "upcoming";
  sections: {
    count: number;
    completed: number;
    pending: number;
    inProgress: number;
  };
};

export const mockMilestones: MilestoneProps[] = [
  {
    id: "m1",
    workspaceId: "workspace-001",
    name: "Setup Project",
    description:
      "Initialize repository, setup CI/CD, and configure environment variables for development and production ",
    startDate: "2025-09-01",
    dueDate: "2025-09-05",
    order: 1,
    status: "completed",
    sections: {
      count: 3,
      completed: 3,
      pending: 0,
      inProgress: 0,
    },
  },
  {
    id: "m2",
    workspaceId: "workspace-001",
    name: "Database Design",
    description: "Create ERD, define schemas, and setup PostgreSQL instance",
    startDate: "2025-09-06",
    dueDate: "2025-09-10",
    order: 2,
    status: "active",
    sections: {
      count: 4,
      completed: 2,
      pending: 1,
      inProgress: 1,
    },
  },
  {
    id: "m3",
    workspaceId: "workspace-001",
    name: "API Development",
    description: "Implement core endpoints for user and workspace management",
    startDate: "2025-09-11",
    dueDate: "2025-09-20",
    order: 3,
    status: "active",
    sections: {
      count: 5,
      completed: 1,
      pending: 3,
      inProgress: 1,
    },
  },
  {
    id: "m4",
    workspaceId: "workspace-001",
    name: "Frontend Integration",
    description: "Connect React frontend with API, handle authentication",
    startDate: "2025-09-21",
    dueDate: "2025-09-30",
    order: 4,
    status: "upcoming",
    sections: {
      count: 6,
      completed: 0,
      pending: 6,
      inProgress: 0,
    },
  },
  {
    id: "m5",
    workspaceId: "workspace-001",
    name: "Testing & Deployment",
    description: "Write integration tests, finalize deployment on Render",
    startDate: "2025-10-01",
    dueDate: "2025-10-05",
    order: 5,
    status: "upcoming",
    sections: {
      count: 3,
      completed: 0,
      pending: 3,
      inProgress: 0,
    },
  },
  {
    id: "m1",
    workspaceId: "workspace-001",
    name: "Setup Project",
    description:
      "Initialize repository, setup CI/CD, and configure environment variables for development and production ",
    startDate: "2025-09-01",
    dueDate: "2025-09-05",
    order: 1,
    status: "completed",
    sections: {
      count: 3,
      completed: 3,
      pending: 0,
      inProgress: 0,
    },
  },
  {
    id: "m2",
    workspaceId: "workspace-001",
    name: "Database Design",
    description: "Create ERD, define schemas, and setup PostgreSQL instance",
    startDate: "2025-09-06",
    dueDate: "2025-09-10",
    order: 2,
    status: "active",
    sections: {
      count: 4,
      completed: 2,
      pending: 1,
      inProgress: 1,
    },
  },
  {
    id: "m3",
    workspaceId: "workspace-001",
    name: "API Development",
    description: "Implement core endpoints for user and workspace management",
    startDate: "2025-09-11",
    dueDate: "2025-09-20",
    order: 3,
    status: "active",
    sections: {
      count: 5,
      completed: 1,
      pending: 3,
      inProgress: 1,
    },
  },
  {
    id: "m4",
    workspaceId: "workspace-001",
    name: "Frontend Integration",
    description: "Connect React frontend with API, handle authentication",
    startDate: "2025-09-21",
    dueDate: "2025-09-30",
    order: 4,
    status: "upcoming",
    sections: {
      count: 6,
      completed: 0,
      pending: 6,
      inProgress: 0,
    },
  },
  {
    id: "m5",
    workspaceId: "workspace-001",
    name: "Testing & Deployment",
    description: "Write integration tests, finalize deployment on Render",
    startDate: "2025-10-01",
    dueDate: "2025-10-05",
    order: 5,
    status: "upcoming",
    sections: {
      count: 3,
      completed: 0,
      pending: 3,
      inProgress: 0,
    },
  },
];
