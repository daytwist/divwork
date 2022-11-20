import { User } from "./userTypes";

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

export type TeamsResponse = {
  teams: Team[];
};

export type TeamResponse = {
  team: Team;
};

export type FetchTeamResponse = {
  team: Team;
  users: User[];
};
