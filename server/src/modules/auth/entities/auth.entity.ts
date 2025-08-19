import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity("accounts")
export class Auth {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ nullable: true })
  refreshToken!: string;

  @Column({ nullable: true })
  lastLoginAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Quan hệ 1-1 với User
  @OneToOne(() => User, (user) => user.auth, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user!: User;
}
