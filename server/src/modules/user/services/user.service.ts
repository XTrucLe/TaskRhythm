import { Injectable } from "@nestjs/common";
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

  async create(dto: CreateUserDto): Promise<User> {
    const role = await this.roleService.getRoleOrDefault(dto.roleName || "");
    const user = this.userRepository.create({ ...dto, role: role });
    return this.userRepository.save(user);
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserResponseDto> {
    await this.userRepository.update(id, dto);
    const updatedUser = await this.userRepository.findOne({
      where: { id: id },
    });
    if (!updatedUser) throw new Error(`User with id ${id} not found`);
    return await this.toResponseDto(updatedUser);
  }

  async getProfile(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ["role"],
    });

    if (!user) throw new Error(`User with id ${id} not found`);

    return await this.toResponseDto(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id: id } });
  }

  private async toResponseDto(user: User): Promise<UserResponseDto> {
    return {
      ...user,
      role: user.role?.name,
    };
  }
}
