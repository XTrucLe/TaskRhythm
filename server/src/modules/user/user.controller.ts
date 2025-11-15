import { Body, Param, Patch, Get, Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "./services/user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserResponseDto } from "./dto/user-response.dto";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { UserMapper } from "./mappers/user.mapper";

@Controller("user")
@UseGuards(AuthGuard("jwt"))
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly mapper: UserMapper
  ) {}

  @Patch("update/:id")
  async updateUser(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    const user = await this.userService.update(id, updateUserDto);
    return this.mapper.toDto(user);
  }

  @Get("me")
  async getMe(
    @CurrentUser("id") currentUserId: string
  ): Promise<UserResponseDto> {
    const profile = await this.userService.getProfile(currentUserId);
    return this.mapper.toDto(profile);
  }

  @Get("all")
  async getAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.userService.getAllUsers();
    return this.mapper.toListDto(users);
  }

  @Get(":id")
  async getUserById(@Param("id") id: string): Promise<UserResponseDto> {
    const user = await this.userService.getUserById(id);
    return this.mapper.toDto(user);
  }
}
