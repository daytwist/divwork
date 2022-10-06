import { FC, SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Divider,
  Typography,
  Stack,
  Button,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { PriorityBarChart } from "../models/team/PriorityBarChart";
import { TasksNewButton } from "../models/task/TasksNewButton";
import { LoadingColorRing } from "../ui/LoadingColorRing";
import { useFetchTeam } from "../../hooks/useFetchTeam";
import { TabPanel } from "../ui/TabPanel";
import { DeadlineBarChart } from "../models/team/DeadlineBarChart";

const TeamsShow: FC = () => {
  const { team, users } = useFetchTeam();
  const [tabValue, setTabValue] = useState(0);

  const tabProps = (index: number) => {
    return {
      id: `tab-${index}`,
      "aria-controls": `tabpanel-${index}`,
    };
  };

  const totals: number[] = [];
  // eslint-disable-next-line array-callback-return
  users?.map((user) => {
    const total = user.unfinished_tasks_priority_count.reduce(
      (sum: number, element: number) => {
        return sum + element;
      },
      0
    );
    totals.push(total);
  });
  const maxCount: number = Math.max(...totals);

  const handleSwitchTab = (event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <div>
      {team ? (
        <Grid2 container direction="column" rowSpacing={1}>
          <Grid2 xs={12}>
            <Typography
              gutterBottom
              variant="h4"
              component="div"
              data-testid="teams-show-h4"
            >
              {team.name}のタスク
            </Typography>
          </Grid2>
          <Grid2 xs={12}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >
              <TasksNewButton />
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={tabValue}
                  onChange={handleSwitchTab}
                  textColor="inherit"
                >
                  <Tab label="優先度" {...tabProps(0)} />
                  <Tab label="納期" {...tabProps(1)} />
                </Tabs>
              </Box>
            </Stack>
          </Grid2>
          {users?.map((user) => (
            <Grid2 xs={12} key={user.id}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
              >
                <Link
                  to={`/users/${user.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Stack
                    component={Button}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      width: { xs: 80, sm: 100 },
                      height: { xs: 80, sm: 120 },
                      mr: { xs: 0, md: 2 },
                    }}
                  >
                    <Avatar
                      src={user.avatar}
                      alt="avatar"
                      sx={{
                        width: { sm: 60 },
                        height: { sm: 60 },
                      }}
                    />
                    <Typography
                      variant="button"
                      sx={{
                        color: "black",
                        mt: 1,
                      }}
                    >
                      {user.name}
                    </Typography>
                  </Stack>
                </Link>
                <Box
                  sx={{
                    width: { xs: 260, sm: 420, md: 530, lg: 750, xl: 900 },
                  }}
                >
                  <TabPanel value={tabValue} index={0}>
                    <PriorityBarChart user={user} maxCount={maxCount} />
                  </TabPanel>
                  <TabPanel value={tabValue} index={1}>
                    <DeadlineBarChart user={user} maxCount={maxCount} />
                  </TabPanel>
                </Box>
              </Stack>
              <Divider />
            </Grid2>
          ))}
        </Grid2>
      ) : (
        <LoadingColorRing />
      )}
    </div>
  );
};

export default TeamsShow;
