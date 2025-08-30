import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { User } from "src/modules/user/entities/user.entity";
import { WorkspaceRole } from "../constants/workspace-role.constant";
import { Workspace } from "src/modules/workspace/entities/workspace.entity";

@Entity("workspace_member")
@Unique(["workspace", "user"])
export class WorkspaceMember {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.members, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "workspace_id" })
  workspace!: Workspace;

  @ManyToOne(() => User, (user) => user.workspaceMembers, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column({
    type: "enum",
    enum: WorkspaceRole,
    default: WorkspaceRole.MEMBER,
  })
  role!: WorkspaceRole;

  @CreateDateColumn()
  joinedAt!: Date;

  @Column({ nullable: true })
  inviteBy!: string;

  @Column({ default: 0 })
  assignedTasks!: number;

  @Column({ default: 0 })
  completedTasks!: number;

  @Column({ type: "jsonb", nullable: true })
  permissions?: Record<string, boolean>;

  @Column({ nullable: true })
  lastActiveAt!: Date;
}
