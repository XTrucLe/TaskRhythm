import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  Check,
} from "typeorm";
import { WorkspaceMember } from "./workspace-member.entity";
import { WorkspaceStatus } from "../constants/workspace-status.constant";
import { WorkspaceType } from "../constants/workspace-type.constant";
import { WorkspaceInvite } from "./workspace-invite.entity";
import { Project } from "src/modules/project/entities/project.entity";

@Entity("workspaces")
@Index(["ownerId", "name"], { unique: true })
@Check(`max_members > 6`)
export class Workspace {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({
    type: "enum",
    enum: WorkspaceType,
    default: WorkspaceType.Personal,
  })
  type!: WorkspaceType;

  @Column({ type: "int", default: 10 })
  maxMembers!: number;

  @Column({
    type: "enum",
    enum: WorkspaceStatus,
    default: WorkspaceStatus.ACTIVE,
  })
  status!: WorkspaceStatus;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ nullable: true, unique: true })
  inviteCode!: string;

  @Column({ nullable: true })
  logoUrl?: string;

  @Column()
  ownerId!: string;

  @Column("jsonb", { nullable: true, default: {} })
  settings!: Record<string, any>;

  @OneToMany(() => WorkspaceMember, (member) => member.workspace)
  members!: WorkspaceMember[];

  @Column({ default: 0 })
  totalMembers!: number;

  @Column({ default: 0 })
  totalProject!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => WorkspaceInvite, (invite) => invite.workspace)
  invites!: WorkspaceInvite[];

  @OneToMany(() => Project, (workspace) => workspace.workspace)
  projects!: Project[];
}
