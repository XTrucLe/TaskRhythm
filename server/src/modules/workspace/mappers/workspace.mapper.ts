import { Workspace } from "../entities/workspace.entity";
import { WorkspaceResponseDto } from "../dto";
import { plainToInstance } from "class-transformer";

export class WorkspaceMapper {
  toDto(entity: Workspace): WorkspaceResponseDto {
    return plainToInstance(WorkspaceResponseDto, entity);
  }
  toDtos(entities: Workspace[]): WorkspaceResponseDto[] {
    return entities.map((entity) => this.toDto(entity));
  }
}
