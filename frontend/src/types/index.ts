export type Team = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
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
  created_at: string;
  updated_at: string;
  tasks_count: number[];
};

export type Task = {
  id: number;
  title: string;
  description: string;
  deadline: string;
  priority: string;
  is_done: boolean;
  user_id: number | null;
  created_at: string;
  updated_at: string;
  parent_id: number | null;
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

export type UsersShowResponse = {
  user: User;
  tasks: Task[];
};

export type TasksResponse = {
  task: Task;
};
