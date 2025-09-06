import { plainToInstance } from "class-transformer";
import { MilestoneHistory } from "../entities/milestone-history.entity";
import { MilestoneHistoryResponseDto } from "../dto/milestone-history/milestone-history-response.dto";

export class MilestoneHistoryMapper {
  toDto(entity: MilestoneHistory): MilestoneHistoryResponseDto {
    return plainToInstance(MilestoneHistoryResponseDto, {
      id: entity.id,
      milestoneId: entity.milestoneId,
      actorId: entity.actorId,
      actionType: entity.actionType,
      previousValue: entity.previousValue,
      newValue: entity.newValue,
      createdAt: entity.createdAt.toISOString(),
    });
  }

  toDtos(entities: MilestoneHistory[]): MilestoneHistoryResponseDto[] {
    return entities.map((entity) => this.toDto(entity));
  }
}
