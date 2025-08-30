import { WorkspaceMember } from "../entities/workspace-member.entity";
import { WorkspaceMemberResponseDto } from "../dto";

export class WorkspaceMemberMapper {
  toDto(entity: WorkspaceMember): WorkspaceMemberResponseDto {
    const dto = new WorkspaceMemberResponseDto();
    dto.id = entity.id;
    dto.fullName = entity.user.fullName;
    dto.avatarUrl = entity.user.avatarUrl;
    dto.email = entity.user.email;
    dto.role = entity.role;
    dto.joinedAt = entity.joinedAt;
    return dto;
  }

  toDtos(entities: WorkspaceMember[]): WorkspaceMemberResponseDto[] {
    return entities.map((entity) => this.toDto(entity));
  }
}
