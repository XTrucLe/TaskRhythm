import { plainToInstance } from "class-transformer";
import { Section } from "../entities/section.entity";
import { SectionResponseDto } from "../dto/section/section-response.dto";

export class SectionMapper {
  toDto(entity: Section): SectionResponseDto {
    return plainToInstance(SectionResponseDto, {
      id: entity.id,
      milestoneId: entity.milestoneId,
      name: entity.name,
      description: entity.description,
      order: entity.order,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    });
  }

  toDtos(entities: Section[]): SectionResponseDto[] {
    return entities.map((entity) => this.toDto(entity));
  }
}
