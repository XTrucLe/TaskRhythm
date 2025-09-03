import { WorkspaceRole as role } from "./workspace-role.constant";
import { WorkspaceAction as action } from "./workspace_action.constant";

type ModeRule = "allowAll" | "denyAll";
interface RuleDefinition {
  mode: ModeRule;
  override: action[];
}

export const BaseRule: Record<role, RuleDefinition> = {
  [role.LEADER]: {
    mode: "allowAll",
    override: [action.LEAVE_WORKSPACE],
  },
  [role.VICE_LEADER]: {
    mode: "allowAll",
    override: [
      action.REMOVE_MEMBER,
      action.DELETE_WORKSPACE,
      action.DELETE_MENTOR_NOTE,
      action.TRANSFER_OWNERSHIP,
      action.ASSIGN_VICE_LEADER,
      action.UPDATE_MEMBER_ROLE,
      action.VIEW_AUDIT_LOG,
    ],
  },

  [role.MEMBER]: {
    mode: "denyAll",
    override: [
      action.LEAVE_WORKSPACE,
      action.VIEW_MENTOR_NOTE,
      action.ASSIGN_TASK,
      action.VIEW_TASK_BOARD,
      action.VIEW_WORKSPACE,
      action.COMMENT_TASK,
    ],
  },
  [role.MENTOR]: {
    mode: "denyAll",
    override: [
      action.LEAVE_WORKSPACE,
      action.CREATE_MENTOR_NOTE,
      action.VIEW_MENTOR_NOTE,
      action.DELETE_MENTOR_NOTE,
      action.VIEW_MEMBERS,
      action.VIEW_AUDIT_LOG,
      action.VIEW_TASK_BOARD,
      action.VIEW_WORKSPACE,
    ],
  },
};

export const WorkspaceRules = () => {
  const allActions = Object.values(action);
  const result: Record<role, Record<action, boolean>> = {} as any;

  for (const [roleKey, ruleDef] of Object.entries(BaseRule)) {
    const basePerms: Record<action, boolean> = {} as any;

    // set default
    for (const act of allActions) {
      basePerms[act] = ruleDef.mode === "allowAll";
    }

    // override
    for (const act of ruleDef.override) {
      basePerms[act] = ruleDef.mode !== "allowAll";
    }

    result[roleKey as role] = basePerms;
  }

  return result;
};
