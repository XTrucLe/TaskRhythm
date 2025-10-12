import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "./entities/task.entity";
import { TaskService } from "./services/task.service";
import { TaskController } from "./controllers/task.controller";
import { UserModule } from "../user/user.module";
import { TaskMapper } from "./mappers/task.mapper";
import { TaskDependency } from "./entities/task-dependency.entity";
import { ProjectModule } from "../project/project.module";
import { TaskComment } from "./entities/task-comment.entity";
import { TaskDependencyService } from "./services/task-dependency.service";
import { TaskCommentService } from "./services/task-comment.service";
import { TaskCommentMapper } from "./mappers/task-comment.mapper";
import { TaskQueryService } from "./services/task-query.service";
import { TaskCommentController } from "./controllers/task-comment.controller";
import { TaskEventHandlerService } from "./services/task-event-handler.service";
import { TaskDependencyController } from "./controllers/task-dependency.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, TaskDependency, TaskComment]),
    UserModule,
    ProjectModule,
  ],
  controllers: [
    TaskController,
    TaskCommentController,
    TaskDependencyController,
  ],
  providers: [
    TaskService,
    TaskQueryService,
    TaskDependencyService,
    TaskCommentService,
    TaskCommentMapper,
    TaskMapper,
    TaskEventHandlerService,
  ],
  exports: [
    TypeOrmModule,
    TaskService,
    TaskDependencyService,
    TaskCommentService,
  ],
})
export class TaskModule {}
