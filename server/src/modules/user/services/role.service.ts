import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Role } from "../entities/role.entity";
import { UserRole } from "../constants/user-role.enum";

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>
  ) {}

  async create(roleName: string, description: string): Promise<Role> {
    const role = this.roleRepository.create({ name: roleName, description });
    return this.roleRepository.save(role);
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async getRoleOrDefault(roleName: string): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { name: roleName || UserRole.USER },
    });
    return role!;
  }
}
