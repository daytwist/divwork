import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Box,
  Avatar,
  ListItemAvatar,
  ListItemIcon,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useFetchTeam } from "../../hooks/team/useFetchTeam";

type Props = {
  // eslint-disable-next-line react/require-default-props
  window?: () => Window;
  open: boolean;
  onClose: () => void;
};

export const LeftDrawer = (props: Props) => {
  const { window, open, onClose } = props;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [teamData, isLoading, error] = useFetchTeam();

  const drawerWidth = 240;

  const unfinishedTasksCount = useCallback((tasks: number[]) => {
    const total = tasks.reduce((sum: number, element: number) => {
      return sum + element;
    }, 0);
    return total;
  }, []);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/teams">
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
            <ListItemButton component={Link} to={`/users/${user.id}`}>
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

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  if (isLoading) {
    return null;
  }

  return (
    <div>
      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
      >
        <Drawer
          container={container}
          variant="temporary"
          open={open}
          onClose={onClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", lg: "none" },
            zIndex: 1200,
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", lg: "block" },
            zIndex: 1200,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </div>
  );
};
