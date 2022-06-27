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
};

export type Task = {
  id: number;
  title: string;
  description: string;
  deadline: string;
  priority: string;
  is_done: boolean;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  parent_id: number;
};

export type SignInResponse = {
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

export type TasksShowResponse = {
  task: Task;
};
