import type { WorkspaceTab } from "./workspace_tab";

export type NewButtonType = Record<
  WorkspaceTab,
  { title: string; onClick: () => void; icon?: React.ReactNode }
>;
