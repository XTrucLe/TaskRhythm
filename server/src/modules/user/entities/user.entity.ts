import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
  Index,
  OneToMany,
} from "typeorm";
import { UserGender } from "../constants/user-gender.enum";
import { Auth } from "src/modules/auth/entities/auth.entity";
import { Role } from "./role.entity";
import { WorkspaceMember } from "src/modules/workspace/entities/workspace-member.entity";
import { WorkspaceInvite } from "src/modules/workspace/entities/workspace-invite.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 100 })
  fullName!: string;

  @Index()
  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true, length: 20 })
  phoneNumber!: string;

  @Column({ type: "enum", enum: UserGender, default: UserGender.OTHER })
  gender!: UserGender;

  @Column({ nullable: true })
  dateOfBirth!: Date;

  @Column({ nullable: true })
  address!: string;

  @Column({ nullable: true })
  avatarUrl!: string;

  @Column({ type: "text", nullable: true })
  bio!: string;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @JoinColumn({ name: "role_id" })
  role!: Role;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Quan hệ 1-1 với Auth (security)
  @OneToOne(() => Auth, (auth) => auth.user, { cascade: true })
  auth!: Auth;

  @OneToMany(() => WorkspaceMember, (member) => member.user)
  workspaceMembers!: WorkspaceMember[];

  @OneToMany(() => WorkspaceInvite, (invite) => invite.invitedBy)
  workspaceInvites!: WorkspaceInvite[];

  @OneToMany(() => WorkspaceInvite, (invite) => invite.invitedUser)
  workspaceInvitesReceived!: WorkspaceInvite[];
}
