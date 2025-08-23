import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Workspace } from "./workspace.entity";
import { User } from "src/modules/user/entities/user.entity";
import { InviteStatus } from "../constants/invite-status.constant";

@Entity("workspace_invite")
export class WorkspaceInvite {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.invites, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "workspace_id" })
  workspace!: Workspace;

  // Người gửi lời mời
  @ManyToOne(() => User, (invited) => invited.workspaceInvites, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "invited_by" })
  invitedBy!: User;

  @Column()
  invitedById!: string;

  // Người nhận lời mời (user đã tồn tại)
  @ManyToOne(() => User, (invited) => invited.workspaceInvitesReceived, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "invited_user" })
  invitedUser!: User;

  @Column()
  invitedUserId!: string;

  @Column({
    type: "enum",
    enum: InviteStatus,
    default: InviteStatus.PENDING,
  })
  status!: InviteStatus;

  @CreateDateColumn()
  invitedAt!: Date;

  @UpdateDateColumn()
  responsedAt!: Date;
}
