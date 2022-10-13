/* eslint-disable import/no-cycle */
import {
  DivisionIncludeUser,
  DivisionIncludeUserAvatar,
} from "./divisionTypes";
import { User } from "./userTypes";

export type Task = {
  id: number;
  title: string;
  description: string;
  deadline: Date;
  priority: string;
  is_done: boolean;
  rate_of_progress: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  parent_id: number;
};

export type ParentTask = {
  id: number;
  title: string;
  description: string;
  deadline: Date;
  priority: string;
  is_done: boolean;
  rate_of_progress: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  parent_id: number;
  user: User;
  avatar: string;
};

export type ChildTask = {
  id: number;
  title: string;
  description: string;
  deadline: Date;
  priority: string;
  is_done: boolean;
  rate_of_progress: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  parent_id: number;
  user: User;
  division: DivisionIncludeUser;
  avatar: string;
  division_avatar: string;
};

export type EditTask = {
  title: string;
  description: string;
  priority: string;
  rate_of_progress: number;
  user_id: number;
};

export type DivisionTask = {
  title: string;
  description: string;
  priority: string;
  rate_of_progress: number;
  parent_id: number;
};

export type TaskResponse = {
  task: Task;
};

export type FetchTaskResponse = {
  task: Task;
  user: User;
  parent_task: ParentTask;
  children_tasks: ChildTask[];
  division: DivisionIncludeUserAvatar | undefined;
};
