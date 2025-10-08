import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Project } from "./entities/project.entity";
import { WorkspaceModule } from "../workspace/workspace.module";
import { ProjectStats } from "./entities/project_stats.entity";
import { ProjectService } from "./services/project.service";

@Module({
  imports: [TypeOrmModule.forFeature([Project, ProjectStats]), WorkspaceModule],
  controllers: [],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
