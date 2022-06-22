export interface Team {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface User {
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
}

export interface Task {
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
}

export interface ShowTeamResponse {
  team: Team;
  users: User[];
}

export interface ShowUserResponse {
  user: User;
  tasks: Task[];
}
