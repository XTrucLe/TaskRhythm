import { Body, Param, Patch, Get, Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "./services/user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserResponseDto } from "./dto/user-response.dto";
import { CurrentUser } from "src/common/decoretors/current-user.decorator";

@Controller("user")
@UseGuards(AuthGuard("jwt"))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch("update/:id")
  async updateUser(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    const user = await this.userService.update(id, updateUserDto);
    return user;
  }

  @Get("me")
  async getMe(@CurrentUser() user: any): Promise<UserResponseDto> {
    return this.userService.getProfile(user.id);
  }
}
