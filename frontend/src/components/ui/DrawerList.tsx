import { useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { TeamsShowResponse } from "../../types/teamTypes";

type Props = {
  onClose: () => void;
  teamData: TeamsShowResponse | undefined;
};

export const DrawerList = (props: Props) => {
  const { onClose, teamData } = props;

  const unfinishedTasksCount = useCallback((tasks: number[]) => {
    const total = tasks.reduce((sum: number, element: number) => {
      return sum + element;
    }, 0);
    return total;
  }, []);

  return (
    <div>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/teams" onClick={onClose}>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText
              primary={teamData?.team?.name}
              secondary={`${teamData?.users?.length}人のメンバー`}
            />
          </ListItemButton>
        </ListItem>
        {teamData?.users?.map((user) => (
          <ListItem key={user.id} disablePadding>
            <ListItemButton
              component={Link}
              to={`/users/${user.id}`}
              onClick={onClose}
            >
              <ListItemAvatar>
                <Avatar src={user.avatar} alt="avatar" />
              </ListItemAvatar>
              <ListItemText
                primary={user.name}
                secondary={`${unfinishedTasksCount(
                  user.unfinished_tasks_priority_count
                )}件のタスク`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
