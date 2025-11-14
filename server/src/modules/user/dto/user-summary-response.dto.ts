import { Exclude, Expose } from "class-transformer";

@Exclude()
export class UserSummaryResponseDto {
  @Expose() id!: string;
  @Expose({ name: "fullName" }) name!: string;
  @Expose() avatarUrl?: string;
}
