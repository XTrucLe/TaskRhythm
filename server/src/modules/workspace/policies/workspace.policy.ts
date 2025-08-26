import { WorkspacePermission } from "../constants/workspace-permission.constant";
import { WorkspaceRole } from "../constants/workspace-role.constant";
import { WorkspacePolicyContext } from "./workspace.policy-context";

export class WorkspacePolicy {
  private static checkPermission(
    context: WorkspacePolicyContext,
    permission: WorkspacePermission
  ): boolean {
    // Chủ sở hữu luôn có quyền
    if (context.userId === context.ownerId) return true;

    // Leader thì check trong permission, mặc định true nếu không khai báo
    if (context.role === WorkspaceRole.LEADER) {
      return context.permissions?.[permission] ?? true;
    }

    // Các role khác mặc định không có quyền
    return false;
  }

  static canInviteMember(context: WorkspacePolicyContext): boolean {
    return this.checkPermission(context, WorkspacePermission.INVITE_MEMBERS);
  }

  static canRemoveMember(context: WorkspacePolicyContext): boolean {
    return this.checkPermission(context, WorkspacePermission.REMOVE_MEMBERS);
  }

  static canUpdateRole(context: WorkspacePolicyContext): boolean {
    return this.checkPermission(context, WorkspacePermission.UPDATE_ROLE);
  }
}
