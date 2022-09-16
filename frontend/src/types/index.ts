export type Team = {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  max_num_of_users: number;
};

export type EditTeam = {
  name: string;
  max_num_of_users: number;
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
  unfinished_tasks_priority_count: number[];
  unfinished_tasks_deadline_count: number[];
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
  rate_of_progress: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  parent_id: number;
};

export type ChildrenTask = {
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
  user: { name: string };
  division: DivisionIncludeUserName;
};

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
  parent_task: Task;
  parent_user: User;
  parent_user_avatar: string;
  child_task: Task;
  child_user: User;
  child_user_avatar: string;
};

export type DivisionIncludeUserName = {
  id: number;
  user_id: number | undefined;
  task_id: number;
  created_at: Date;
  updated_at: Date;
  comment: string;
  user: { name: string };
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

export type AuthPasswordResponse = {
  success: boolean;
  data: User;
  message: string;
};

export type TeamsSelectResponse = {
  teams: Team[];
};

export type TeamsResponse = {
  team: Team;
};

export type TeamsShowResponse = {
  team: Team;
  users: User[];
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

export type TasksResponse = {
  task: Task;
};

export type TasksShowResponse = {
  task: Task;
  children_tasks: ChildrenTask[];
  division: DivisionIncludeUserName | undefined;
};

export type DivisionsNewResponse = {
  task: Task;
  team_members: User[];
};

export type DivisionsCreateResponse = {
  task: Task;
  division: Division;
};
