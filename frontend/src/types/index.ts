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
  tasks_count: number[];
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

export type newTask = {
  title: string;
  description: string;
  is_done: boolean;
};

export type editTask = {
  title: string;
  description: string;
  is_done: boolean;
  user_id: number;
};

export type divisionTask = {
  title: string;
  description: string;
  user_id: number;
  parent_id: number;
};

export type newDivision = {
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
  tasks: Task[];
};

export type TasksResponse = {
  task: Task;
};

export type DivisionsCreateResponse = {
  task: Task;
  division: Division;
};
