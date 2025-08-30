import { ForbiddenException } from "@nestjs/common";
import { WorkspaceMemberPolicyContext } from "./workspace.policy-context";
import { WorkspaceRole } from "../constants/workspace-role.constant";
import { WorkspacePermission } from "../constants/workspace-permission.constant";

export class WorkspaceMemberPolicy {
  private static authorize(condition: boolean, message: string): void {
    if (!condition) {
      throw new ForbiddenException(message);
    }
  }

  private static checkPermission(
    context: WorkspaceMemberPolicyContext,
    permission: WorkspacePermission
  ): boolean {
    if (context.userId === context.ownerId) return true;
    if (context.role === WorkspaceRole.LEADER) {
      return context.permissions?.[permission] ?? true;
    }
    return false;
  }

  static canInviteMember(context: WorkspaceMemberPolicyContext): void {
    this.authorize(
      this.checkPermission(context, WorkspacePermission.INVITE_MEMBERS),
      "You are not allowed to invite members into this workspace."
    );
  }

  static canRemoveMember(context: WorkspaceMemberPolicyContext): void {
    this.authorize(
      this.checkPermission(context, WorkspacePermission.REMOVE_MEMBERS),
      "You are not allowed to remove members from this workspace."
    );
  }

  static canTransferOwnership(context: WorkspaceMemberPolicyContext): void {
    this.authorize(
      context.userId === context.ownerId,
      "You are not allowed to transfer ownership of this workspace."
    );
  }

  static canUpdateRole(
    actor: WorkspaceMemberPolicyContext,
    target: WorkspaceMemberPolicyContext,
    newRole: WorkspaceRole
  ): void {
    // Owner
    if (actor.userId === actor.ownerId) {
      this.authorize(
        actor.userId !== target.userId,
        "Owner cannot change their own role."
      );
      return;
    }

    // Leader
    if (actor.role === WorkspaceRole.LEADER) {
      this.authorize(
        target.userId !== actor.ownerId,
        "Leader cannot change the owner's role."
      );
      this.authorize(
        !(
          target.role === WorkspaceRole.LEADER && target.userId !== actor.userId
        ),
        "Leader cannot change another leader's role."
      );
      this.authorize(
        !(actor.userId === target.userId && newRole !== WorkspaceRole.LEADER),
        "Leader cannot downgrade their own role."
      );
      return;
    }

    // Mentor or Member
    throw new ForbiddenException(
      "You are not allowed to update roles in this workspace."
    );
  }

  static canLeaveWorkspace(context: WorkspaceMemberPolicyContext): void {
    this.authorize(
      context.userId !== context.ownerId,
      "Owner cannot leave the workspace. Please transfer ownership or delete the workspace."
    );
  }
}
