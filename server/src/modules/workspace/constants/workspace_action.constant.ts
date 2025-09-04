export enum WorkspaceAction {
  // Workspace Management
  UPDATE_WORKSPACE_INFO = "updateWorkspaceInfo",
  UPDATE_WORKSPACE_NAME = "updateWorkspaceName",
  UPDATE_WORKSPACE_LOGO = "updateWorkspaceLogo",
  DELETE_WORKSPACE = "deleteWorkspace",
  TRANSFER_OWNERSHIP = "transferOwnership",

  // Membership Management
  INVITE_MEMBER = "inviteMember",
  MANAGE_INVITES = "manageInvites",
  APPROVE_JOIN_REQUEST = "approveJoinRequest",
  REMOVE_MEMBER = "removeMember",
  LEAVE_WORKSPACE = "leaveWorkspace",
  UPDATE_MEMBER_ROLE = "updateMemberRole",
  VIEW_MEMBERS = "viewMembers",

  // Role / Permission Management
  ASSIGN_VICE_LEADER = "assignViceLeader",
  ASSIGN_MENTOR = "assignMentor",
  OVERRIDE_PERMISSION = "overridePermission",

  // Task / Project Management
  CREATE_TASK = "createTask",
  UPDATE_TASK = "updateTask",
  DELETE_TASK = "deleteTask",
  ASSIGN_TASK = "assignTask",
  COMMENT_TASK = "commentTask",
  VIEW_TASK_BOARD = "viewTaskBoard",

  // Mentorship
  CREATE_MENTOR_NOTE = "createMentorNote",
  VIEW_MENTOR_NOTE = "viewMentorNote",
  DELETE_MENTOR_NOTE = "deleteMentorNote",

  // General
  VIEW_WORKSPACE = "viewWorkspace",
  MANAGE_FILES = "manageFiles",
  VIEW_AUDIT_LOG = "viewAuditLog",
}
