import { plainToInstance } from "class-transformer";
import { User } from "../entities/user.entity";
import { UserResponseDto, UserSummaryDto } from "../dto/user-response.dto";

export class UserMapper {
  toDto(user: User): UserResponseDto {
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  toListDto(users: User[]): UserResponseDto[] {
    return users.map((user) => this.toDto(user));
  }

  toSummaryDto(user: User): UserSummaryDto {
    return plainToInstance(UserSummaryDto, user, {
      excludeExtraneousValues: true,
    });
  }
}
