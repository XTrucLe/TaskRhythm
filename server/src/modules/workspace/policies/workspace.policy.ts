import { ForbiddenException } from "@nestjs/common";
import { WorkspacePolicyContext } from "./workspace.policy-context";

export class WorkspacePolicy {
  private static authorize(allowed: boolean, errorMessage: string): void {
    if (!allowed) {
      throw new ForbiddenException(errorMessage);
    }
  }

  static canUpdateWorkspace(context: WorkspacePolicyContext): void {
    this.authorize(
      context.userId === context.ownerId,
      "You are not allowed to update this workspace."
    );
  }

  static canDeleteWorkspace(context: WorkspacePolicyContext): void {
    this.authorize(
      context.userId === context.ownerId,
      "Only the owner can delete the workspace."
    );
  }
}
