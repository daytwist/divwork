export interface Team {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
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
  created_at: string;
  updated_at: string;
}

export interface TeamsShowResponse {
  team: Team;
  users: User[];
}
