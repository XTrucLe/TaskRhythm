import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../entities/user.entity";
import { RoleService } from "./role.service";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly roleService: RoleService
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const role = await this.roleService.getRoleOrDefault(dto.roleName || "");
    const user = this.userRepository.create({ ...dto, role });
    return this.userRepository.save(user);
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.findUserById(id);

    if (dto.roleName) {
      user.role = await this.roleService.getRoleOrDefault(dto.roleName);
      delete (dto as any).roleName;
    }

    Object.assign(user, dto);
    return this.userRepository.save(user);
  }

  async getProfile(id: string): Promise<User> {
    return this.findUserById(id);
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find({ relations: ["role"] });
    if (!users || users.length === 0) {
      throw new NotFoundException(`No users found`);
    }
    return users;
  }

  async getUserById(id: string): Promise<User> {
    return this.findUserById(id);
  }

  async getUserEntity(id: string): Promise<User> {
    return this.findUserById(id);
  }

  private async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ["role"],
    });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }
}
