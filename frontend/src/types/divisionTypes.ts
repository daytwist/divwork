/* eslint-disable import/no-cycle */
import { Task } from "./taskTypes";
import { User } from "./userTypes";

export type Division = {
  id: number;
  user_id: number | undefined;
  task_id: number;
  created_at: Date;
  updated_at: Date;
  comment: string;
};

export type DivisionHistory = {
  id: number;
  user_id: number | undefined;
  task_id: number;
  created_at: Date;
  updated_at: Date;
  comment: string;
  user: {
    name: string;
  };
  parent_task: Task;
  parent_user: User;
  parent_user_avatar: string;
  child_task: Task;
  child_user: User;
  child_user_avatar: string;
};

export type DivisionIncludeUser = {
  id: number;
  user_id: number | undefined;
  task_id: number;
  created_at: Date;
  updated_at: Date;
  comment: string;
  user: User;
};

export type DivisionIncludeUserAvatar = {
  id: number;
  user_id: number | undefined;
  task_id: number;
  created_at: Date;
  updated_at: Date;
  comment: string;
  user: User;
  avatar: string;
};

export type NewDivision = {
  comment: string;
};

export type FetchNewDivisionResponse = {
  task: Task;
  team_members: User[];
};

export type PostDivisionResponse = {
  task: Task;
  division: Division;
};
