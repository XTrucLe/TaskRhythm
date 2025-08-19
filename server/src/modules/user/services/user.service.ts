import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../entities/user.entity";
import { RoleService } from "./role.service";
import { UserResponseDto } from "../dto/user-response.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly roleService: RoleService
  ) {}

  async create(dto: CreateUserDto): Promise<UserResponseDto> {
    const role = await this.roleService.getRoleOrDefault(dto.roleName || "");
    const user = this.userRepository.create({ ...dto, role });
    const saved = await this.userRepository.save(user);
    return this.toResponseDto(saved);
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ["role"],
    });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    if (dto.roleName) {
      user.role = await this.roleService.getRoleOrDefault(dto.roleName);
      delete (dto as any).roleName;
    }

    Object.assign(user, dto);
    const updated = await this.userRepository.save(user);
    return this.toResponseDto(updated);
  }

  async getProfile(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ["role"],
    });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return this.toResponseDto(user);
  }

  async getAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find({ relations: ["role"] });
    if (!users || users.length === 0)
      throw new NotFoundException(`No users found`);
    return await Promise.all(users.map((user) => this.toResponseDto(user)));
  }

  async getUserById(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ["role"],
    });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return this.toResponseDto(user);
  }

  private async toResponseDto(user: User): Promise<UserResponseDto> {
    return {
      ...user,
      role: user.role?.name,
    };
  }
}
