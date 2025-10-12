import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "./entities/task.entity";
import { TaskService } from "./services/task.service";
import { TaskController } from "./controllers/task.controller";
import { UserModule } from "../user/user.module";
import { TaskMapper } from "./mapppers/task.mapper";
import { TaskDependency } from "./entities/task-dependency.entity";
import { ProjectModule } from "../project/project.module";
import { TaskComment } from "./entities/task-comment.entity";
import { TaskDependencyService } from "./services/task-dependency.service";
import { TaskCommentService } from "./services/task-comment.service";
import { TaskCommentMapper } from "./mapppers/task-comment.mapper";
import { TaskQueryService } from "./services/task-query.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, TaskDependency, TaskComment]),
    UserModule,
    ProjectModule,
  ],
  controllers: [TaskController],
  providers: [
    TaskService,
    TaskQueryService,
    TaskMapper,
    TaskDependencyService,
    TaskCommentService,
    TaskCommentMapper,
  ],
  exports: [
    TypeOrmModule,
    TaskService,
    TaskDependencyService,
    TaskCommentService,
    TaskCommentMapper,
  ],
})
export class TaskModule {}
