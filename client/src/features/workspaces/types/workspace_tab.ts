export const WorkspaceTabs = {
  PROJECTS: "projects",
  MEMBERS: "members",
  SETTINGS: "settings",
} as const;

export type WorkspaceTab = keyof typeof WorkspaceTabs;
