/* eslint-disable import/no-cycle */
import { DivisionHistory } from "./divisionTypes";
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

export type UsersResponse = {
  user: User;
  unfinished_tasks: Task[];
  finished_tasks: Task[];
  divisions: DivisionHistory[];
};

export type UsersUpdateResponse = {
  status: string;
  data: User;
};

export type PasswordState = {
  password: string;
  passwordConfirmation: string;
  showPassword: boolean;
};

export type AuthSessionsResponse = {
  is_signed_in: boolean;
  current_user: User | undefined;
};

export type AuthResponse = {
  data: User;
};

export type AuthPasswordResponse = {
  success: boolean;
  data: User;
  message: string;
};
