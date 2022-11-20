/* eslint-disable import/no-cycle */
import { DividedHistory } from "./divisionTypes";
import { Task } from "./taskTypes";

export type User = {
  id: number;
  provider: string;
  uid: string;
  allow_password_change: boolean;
  name: string;
  nickname: string;
  image: string;
  email: string;
  team_id: number;
  created_at: Date;
  updated_at: Date;
  unfinished_tasks_priority_count: number[];
  unfinished_tasks_deadline_count: number[];
  avatar: string;
  admin: boolean;
};

export type UserResponse = {
  user: User;
  unfinished_tasks: Task[];
  finished_tasks: Task[];
  divisions: DividedHistory[];
};

export type AuthResponse = {
  data: User;
};

export type PatchAuthResponse = {
  status: string;
  data: User;
};

export type FetchSessionsResponse = {
  is_signed_in: boolean;
  current_user: User | undefined;
};

export type PasswordState = {
  password: string;
  passwordConfirmation: string;
  showPassword: boolean;
};

export type PatchPasswordResponse = {
  success: boolean;
  data: User;
  message: string;
};
