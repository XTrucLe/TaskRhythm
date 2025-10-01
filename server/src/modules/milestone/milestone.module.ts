import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Milestone } from "./entities/milestone.entity";
import { WorkspaceModule } from "../workspace/workspace.module";
import { MilestoneHistory } from "./entities/milestone-history.entity";
import { MilestoneController } from "./controllers/milestone.controller";
import { MilestoneService } from "./services/milestone.sevice";
import { MilestoneMapper } from "./mappers/milestone.mapper";

@Module({
  imports: [
    TypeOrmModule.forFeature([Milestone, MilestoneHistory]),
    WorkspaceModule,
  ],
  controllers: [MilestoneController],
  providers: [MilestoneService, MilestoneMapper],
  exports: [MilestoneService],
})
export class MilestoneModule {}
