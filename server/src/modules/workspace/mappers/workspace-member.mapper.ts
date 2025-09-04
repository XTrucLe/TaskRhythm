import { WorkspaceMember } from "../entities/workspace-member.entity";
import { WorkspaceMemberResponseDto } from "../dto";
import { plainToInstance } from "class-transformer";

export class WorkspaceMemberMapper {
  toDto(entity: WorkspaceMember): WorkspaceMemberResponseDto {
    return plainToInstance(WorkspaceMemberResponseDto, {
      id: entity.id,
      fullName: entity.user.fullName,
      avatarUrl: entity.user.avatarUrl,
      email: entity.user.email,
      role: entity.role,
      joinedAt: entity.joinedAt,
    });
  }

  toDtos(entities: WorkspaceMember[]): WorkspaceMemberResponseDto[] {
    return entities.map((entity) => this.toDto(entity));
  }
}
