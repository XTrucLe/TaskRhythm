import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "./entities/task.entity";
import { TaskService } from "./services/task.service";
import { TaskController } from "./controllers/task.controller";
import { UserModule } from "../user/user.module";
import { WorkspaceModule } from "../workspace/workspace.module";
import { TaskMapper } from "./mapppers/task.mapper";

@Module({
  imports: [TypeOrmModule.forFeature([Task]), WorkspaceModule, UserModule],
  controllers: [TaskController],
  providers: [TaskService, TaskMapper],
  exports: [TypeOrmModule],
})
export class TaskModule {}
