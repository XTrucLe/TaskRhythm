import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "./entities/task.entity";
import { TaskService } from "./services/task.service";
import { TaskController } from "./controllers/task.controller";
import { UserModule } from "../user/user.module";
import { WorkspaceModule } from "../workspace/workspace.module";
import { TaskMapper } from "./mapppers/task.mapper";
import { TaskUtilsService } from "./services/task-utils.service";
import { TaskDependency } from "./entities/task-dependency.entity";
import { ProjectModule } from "../project/project.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, TaskDependency]),
    WorkspaceModule,
    UserModule,
    ProjectModule,
  ],
  controllers: [TaskController],
  providers: [TaskService, TaskMapper, TaskUtilsService],
  exports: [TypeOrmModule, TaskService],
})
export class TaskModule {}
