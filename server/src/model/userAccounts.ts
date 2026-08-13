export type UserRole = "Admin" | "User";

export interface UserAccount {
  id: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;

  firstName?: string;
  lastName?: string;
  profilePicture?: string;

  isActive: boolean;
  isVerified: boolean;

  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}