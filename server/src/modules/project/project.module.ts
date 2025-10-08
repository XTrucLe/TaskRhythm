import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Project } from "./entities/project.entity";
import { WorkspaceModule } from "../workspace/workspace.module";
import { ProjectStats } from "./entities/project_stats.entity";
import { ProjectService } from "./services/project.service";
import { ProjectMapper } from "./mappers/project.mapper";
import { ProjectController } from "./controllers/project.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, ProjectStats]),
    forwardRef(() => WorkspaceModule),
  ],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectMapper],
  exports: [ProjectService],
})
export class ProjectModule {}
