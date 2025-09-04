import { WorkspaceRole } from "./workspace-role.constant";

export const WorkspaceRoleLimit = {
  [WorkspaceRole.LEADER]: 1,
  [WorkspaceRole.VICE_LEADER]: 2,
  [WorkspaceRole.MENTOR]: 3,
  [WorkspaceRole.MEMBER]: 50,
};
