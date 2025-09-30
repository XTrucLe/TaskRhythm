import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Milestone } from "./entities/milestone.entity";
import { Section } from "./entities/section.entity";
import { WorkspaceModule } from "../workspace/workspace.module";
import { MilestoneHistory } from "./entities/milestone-history.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Milestone, Section, MilestoneHistory]),
    WorkspaceModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class MilestoneModule {}
