import { WorkspaceInviteResponseDto } from "../dto";
import { WorkspaceInvite } from "../entities/workspace-invite.entity";

export class WorkspaceInviteMapper {
  toDto(entity: WorkspaceInvite): WorkspaceInviteResponseDto {
    return {
      id: entity.id,
      workspace: {
        id: entity.workspace.id,
        name: entity.workspace.name,
        logoUrl: entity.workspace.logoUrl,
      },
      invitedBy: {
        id: entity.invitedBy.id,
        name: entity.invitedBy.fullName,
        avatarUrl: entity.invitedBy.avatarUrl,
      },
      invitedUser: {
        id: entity.invitedUser.id,
        name: entity.invitedUser.fullName,
        avatarUrl: entity.invitedUser.avatarUrl,
      },
      status: entity.status,
      invitedAt: entity.invitedAt,
      responsedAt: entity.responsedAt,
    };
  }

  toDtos(entities: WorkspaceInvite[]): WorkspaceInviteResponseDto[] {
    return entities.map((entity) => this.toDto(entity));
  }
}
