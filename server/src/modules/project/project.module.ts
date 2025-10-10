import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Project } from "./entities/project.entity";
import { WorkspaceModule } from "../workspace/workspace.module";
import { ProjectStats } from "./entities/project_stats.entity";
import { ProjectService } from "./services/project.service";
import { ProjectMapper } from "./mappers/project.mapper";
import { ProjectController } from "./controllers/project.controller";
import { ProjectEventHandlerService } from "./services/project-event-handler.service";
import { ProjectStatsService } from "./services/project-stats.service";

@Module({
  imports: [TypeOrmModule.forFeature([Project, ProjectStats]), WorkspaceModule],
  controllers: [ProjectController],
  providers: [
    ProjectService,
    ProjectMapper,
    ProjectStatsService,
    ProjectEventHandlerService,
  ],
  exports: [ProjectService, ProjectStatsService],
})
export class ProjectModule {}
