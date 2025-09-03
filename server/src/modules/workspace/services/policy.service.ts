import { WorkspaceRules } from "../constants/workspace_rule.constant";
import { WorkspaceAction as action } from "../constants/workspace_action.constant";
import { WorkspaceRole } from "../constants/workspace-role.constant";

export class PolicyService {
  private static defaultRule = WorkspaceRules();
  static can(
    role: WorkspaceRole,
    act: action,
    custom?: Record<string, boolean>
  ): boolean {
    const rule = this.defaultRule[role]?.[act];
    return custom?.[act] ?? rule;
  }
}
