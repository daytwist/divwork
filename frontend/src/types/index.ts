export type Team = {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
};

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
  unfinished_tasks_count: number[];
  avatar: string;
  admin: boolean;
};

export type Task = {
  id: number;
  title: string;
  description: string;
  deadline: Date;
  priority: string;
  is_done: boolean;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  parent_id: number;
};

export type Division = {
  id: number;
  user_id: number;
  task_id: number;
  created_at: Date;
  updated_at: Date;
  comment: string;
};

export type NewTask = {
  title: string;
  description: string;
  is_done: boolean;
};

export type EditTask = {
  title: string;
  description: string;
  is_done: boolean;
  user_id: number;
};

export type DivisionTask = {
  title: string;
  description: string;
  parent_id: number;
};

export type NewDivision = {
  comment: string;
};

export type AuthSessionsResponse = {
  is_signed_in: boolean;
  current_user: User | undefined;
};

export type AuthResponse = {
  data: User;
};

export type TeamsSelectResponse = {
  teams: Team[];
};

export type TeamsShowResponse = {
  team: Team;
  users: User[];
};

export type UsersResponse = {
  user: User;
  unfinished_tasks: Task[];
  finished_tasks: Task[];
  avatar: string;
};

export type TasksResponse = {
  task: Task;
};

export type DivisionsNewResponse = {
  task: Task;
  team_members: User[];
};

export type DivisionsCreateResponse = {
  task: Task;
  division: Division;
};
