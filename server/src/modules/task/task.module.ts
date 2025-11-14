import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "./entities/task.entity";
import { TaskService } from "./services/task.service";
import { TaskController } from "./controllers/task.controller";
import { UserModule } from "../user/user.module";
import { TaskMapper } from "./mappers/task.mapper";
import { ProjectModule } from "../project/project.module";
import { TaskComment } from "./entities/task-comment.entity";
import { TaskCommentService } from "./services/task-comment.service";
import { TaskCommentMapper } from "./mappers/task-comment.mapper";
import { TaskQueryService } from "./services/task-query.service";
import { TaskCommentController } from "./controllers/task-comment.controller";
import { TaskEventHandlerService } from "./services/task-event-handler.service";
import { TaskAssignee } from "./entities/task-assignee.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, TaskComment, TaskAssignee]),
    UserModule,
    ProjectModule,
  ],
  controllers: [TaskController, TaskCommentController],
  providers: [
    TaskService,
    TaskQueryService,
    TaskCommentService,
    TaskCommentMapper,
    TaskMapper,
    TaskEventHandlerService,
  ],
  exports: [TypeOrmModule, TaskService, TaskCommentService],
})
export class TaskModule {}
