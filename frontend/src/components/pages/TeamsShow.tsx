import { FC, SyntheticEvent, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Divider,
  Grid,
  Typography,
  Stack,
  Button,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import { TasksBarChart } from "../models/task/TasksBarChart";
import { TasksNewButton } from "../models/task/TasksNewButton";
import { LoadingColorRing } from "../ui/LoadingColorRing";
import { useFetchTeam } from "../../hooks/useFetchTeam";
import { TabPanel } from "../ui/TabPanel";
import { DeadlineBarChart } from "../models/task/DeadlineBarChart";

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

  const handleSwitchTab = useCallback(
    (event: SyntheticEvent, newValue: number) => {
      setTabValue(newValue);
    },
    [tabValue]
  );

  return (
    <div>
      {team ? (
        <div>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography
                gutterBottom
                variant="h4"
                component="div"
                data-testid="teams-show-h4"
              >
                {team.name}のタスク
              </Typography>
            </Grid>
            <Grid item>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <TasksNewButton />
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={tabValue}
                    onChange={handleSwitchTab}
                    textColor="inherit"
                  >
                    <Tab label="優先度別" {...tabProps(0)} />
                    <Tab label="納期別" {...tabProps(1)} />
                  </Tabs>
                </Box>
              </Stack>
            </Grid>
            {users?.map((user) => (
              <Grid item key={user.id}>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
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
                          mr: { xs: 1, sm: 2 },
                        }}
                      >
                        {user.avatar ? (
                          <Avatar
                            src={user.avatar}
                            alt="avatar"
                            sx={{
                              width: { sm: 60 },
                              height: { sm: 60 },
                            }}
                          />
                        ) : (
                          <Avatar
                            sx={{
                              width: { sm: 60 },
                              height: { sm: 60 },
                            }}
                          />
                        )}
                        <Typography
                          variant="button"
                          sx={{
                            color: "black",
                            mt: { xs: 0, sm: 1 },
                          }}
                        >
                          {user.name}
                        </Typography>
                      </Stack>
                    </Link>
                  </Grid>
                  <Grid item>
                    <TabPanel value={tabValue} index={0}>
                      <TasksBarChart user={user} maxCount={maxCount} />
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                      <DeadlineBarChart user={user} maxCount={maxCount} />
                    </TabPanel>
                  </Grid>
                </Grid>
                <Divider />
              </Grid>
            ))}
          </Grid>
        </div>
      ) : (
        <LoadingColorRing />
      )}
    </div>
  );
};

export default TeamsShow;
