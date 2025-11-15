import { Expose, Exclude, Transform } from "class-transformer";
import { UserGender } from "../constants/user-gender.enum";

@Exclude()
export class UserResponseDto {
  @Expose() id!: string;
  @Expose() email!: string;
  @Expose() fullName?: string;
  @Expose() phoneNumber?: string;
  @Expose() avatarUrl?: string;
  @Expose() gender?: UserGender;
  @Expose() dateOfBirth?: Date;
  @Expose() bio?: string;
  @Expose()
  @Transform(({ obj }) => obj.role?.name, { toClassOnly: true })
  role!: string;
}

@Exclude()
export class UserSummaryDto {
  @Expose() id!: string;
  @Expose({ name: "fullName" }) name!: string;
  @Expose() avatarUrl?: string;
}
