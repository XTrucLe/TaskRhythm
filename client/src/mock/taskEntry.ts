type TaskEntryProps = {
  task: string;
  workspace: string;
  milestone: string;
  dueDate: Date;
  priority: 1 | 2 | 3;
  status: "todo" | "in-progress" | "done";
};

export const mockTaskEntries: TaskEntryProps[] = [
  {
    task: "Design Landing Page",
    workspace: "Marketing Team",
    milestone: "Q3 Launch",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 5)), // 5 days from now
    priority: 2,
    status: "in-progress",
  },
  {
    task: "Implement Authentication",
    workspace: "Frontend Team",
    milestone: "Phase 1 Development",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 10)), // 10 days from now
    priority: 1,
    status: "todo",
  },
  {
    task: "Setup Database",
    workspace: "Backend Team",
    milestone: "Phase 1 Development",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 3)), // 3 days from now
    priority: 3,
    status: "in-progress",
  },
  {
    task: "QA Testing",
    workspace: "QA Team",
    milestone: "Phase 1 Development",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 7)), // 7 days from now
    priority: 2,
    status: "todo",
  },
  {
    task: "Deploy to Staging",
    workspace: "DevOps Team",
    milestone: "Phase 1 Deployment",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 14)), // 14 days from now
    priority: 1,
    status: "todo",
  },
];
