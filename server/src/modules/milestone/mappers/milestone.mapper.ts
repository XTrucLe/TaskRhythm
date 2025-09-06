import { plainToInstance } from "class-transformer";
import { SectionMapper } from "./section.mapper";
import { Milestone } from "../entities/milestone.entity";
import { MilestoneResponseDto } from "../dto/milestone/milestone-response.dto";

export class MilestoneMapper {
  constructor(
    private readonly sectionMapper: SectionMapper = new SectionMapper()
  ) {}

  toDto(entity: Milestone): MilestoneResponseDto {
    return plainToInstance(MilestoneResponseDto, {
      id: entity.id,
      workspaceId: entity.workspaceId,
      name: entity.name,
      description: entity.description,
      startDate: entity.startDate?.toISOString(),
      dueDate: entity.dueDate?.toISOString(),
      status: entity.status,
      order: entity.order,
      sections: entity.sections
        ? this.sectionMapper.toDtos(entity.sections)
        : [],
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    });
  }

  toDtos(entities: Milestone[]): MilestoneResponseDto[] {
    return entities.map((entity) => this.toDto(entity));
  }
}
