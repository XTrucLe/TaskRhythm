import { plainToInstance } from "class-transformer";
import { Milestone } from "../entities/milestone.entity";
import { MilestoneResponseDto } from "../dto/milestone/milestone-response.dto";

export class MilestoneMapper {
  constructor() {}

  toDto(entity: Milestone): MilestoneResponseDto {
    return plainToInstance(MilestoneResponseDto, {
      id: entity.id,
      workspaceId: entity.workspaceId,
      name: entity.name,
      description: entity.description,
      startDate: entity.startDate,
      dueDate: entity.dueDate,
      status: entity.status,
      order: entity.order,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  toDtos(entities: Milestone[]): MilestoneResponseDto[] {
    return entities.map((entity) => this.toDto(entity));
  }
}
