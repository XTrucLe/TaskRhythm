import { WorkspaceRules } from "../constants/workspace_rule.constant";
import { WorkspaceAction as action } from "../constants/workspace_action.constant";
import { WorkspaceRole } from "../constants/workspace-role.constant";
import { ForbiddenException } from "@nestjs/common";

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

  static assertCan(
    role: WorkspaceRole,
    act: action,
    custom?: Record<string, boolean>
  ): void {
    if (!this.can(role, act, custom)) {
      throw new ForbiddenException(
        `Permission denied for ${role} to perform ${act}`
      );
    }
  }
}
