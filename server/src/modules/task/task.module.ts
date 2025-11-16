import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../user/user.module";
import { ProjectModule } from "../project/project.module";
import { TaskAssignmentController } from "./controllers/task-assignment.controller";
import { TaskCommentController } from "./controllers/task-comment.controller";
import { TaskController } from "./controllers/task.controller";
import { TaskAssignee } from "./entities/task-assignee.entity";
import { TaskComment } from "./entities/task-comment.entity";
import { Task } from "./entities/task.entity";
import { TaskAssignmentEventHandler } from "./events/task-assignment.event";
import { TaskEventHandler } from "./events/task.event";
import { TaskAssignmentMapper } from "./mappers/task-asignment.mapper";
import { TaskCommentMapper } from "./mappers/task-comment.mapper";
import { TaskMapper } from "./mappers/task.mapper";
import { TaskAssignmentService } from "./services/task-assignment.service";
import { TaskCommentService } from "./services/task-comment.service";
import { TaskQueryService } from "./services/task-query.service";
import { TaskService } from "./services/task.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, TaskComment, TaskAssignee]),
    UserModule,
    ProjectModule,
  ],
  controllers: [
    TaskController,
    TaskCommentController,
    TaskAssignmentController,
  ],
  providers: [
    TaskService,
    TaskQueryService,
    TaskCommentService,
    TaskCommentMapper,
    TaskMapper,
    TaskEventHandler,
    TaskAssignmentEventHandler,
    TaskAssignmentService,
    TaskAssignmentMapper,
  ],
  exports: [
    TypeOrmModule,
    TaskService,
    TaskCommentService,
    TaskAssignmentService,
  ],
})
export class TaskModule {}
