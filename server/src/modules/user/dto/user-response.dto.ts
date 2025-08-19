import { UserGender } from "../constants/user-gender.enum";

export class UserResponseDto {
  id!: string;
  email!: string;
  fullName?: string;
  phoneNumber?: string;
  avatarUrl?: string;
  gender?: UserGender;
  dateOfBirth?: Date;
  role?: string;
  bio?: string;
}
