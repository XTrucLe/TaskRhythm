export interface UserBase {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
}

export interface UserProfile extends UserBase {
  phoneNumber?: string;
  gender?: string;
  role?: string;
  bio?: string;
}
