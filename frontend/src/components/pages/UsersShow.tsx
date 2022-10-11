import {
  useContext,
  useState,
  SyntheticEvent,
  useEffect,
  useCallback,
} from "react";
import { useParams } from "react-router-dom";
import { Box, Stack, Tab, Tabs } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { GridRowId } from "@mui/x-data-grid";
import { TasksActionButtons } from "../models/user/TasksActionButtons";
import { AuthContext } from "../../providers/AuthProvider";
import { useUser } from "../../hooks/useUser";
import { TasksDataGrid } from "../models/user/TasksDataGrid";
import { DivisionsDataGrid } from "../models/user/DivisionsDataGrid";
import { LoadingColorRing } from "../ui/LoadingColorRing";
import { TabPanel } from "../ui/TabPanel";
import { UserNameHeader } from "../models/user/UserNameHeader";
import { BackIconButton } from "../ui/BackIconButton";

export const UsersShow = () => {
  const { currentUser } = useContext(AuthContext);
  const { id: userId } = useParams();
  const [reloadFlag, setReloadFlag] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [userData, isLoading, error] = useUser(userId, reloadFlag);

  const tabProps = (index: number) => {
    return {
      id: `tab-${index}`,
      "aria-controls": `tabpanel-${index}`,
    };
  };

  const handleSwitchTasks = useCallback(
    (event: SyntheticEvent, newValue: number) => {
      setTabValue(newValue);

      if (newValue === 0) {
        setIsFinished(false);
        setSelectionModel([]);
      } else if (newValue === 1) {
        setIsFinished(true);
        setSelectionModel([]);
      }
    },
    []
  );

  const unfinishedTasksDataGrid = (
    <TasksDataGrid
      isFinished={false}
      user={userData?.user}
      tasks={userData?.unfinished_tasks}
      selectionModel={selectionModel}
      setSelectionModel={setSelectionModel}
    />
  );

  const finishedTasksDataGrid = (
    <TasksDataGrid
      isFinished
      user={userData?.user}
      tasks={userData?.finished_tasks}
      selectionModel={selectionModel}
      setSelectionModel={setSelectionModel}
    />
  );

  const divisionsDataGrid = (
    <DivisionsDataGrid divisions={userData?.divisions} />
  );

  useEffect(() => {
    if (userData?.unfinished_tasks && tabValue === 0) {
      setIsFinished(false);
      setSelectionModel([]);
    } else if (userData?.finished_tasks && tabValue === 1) {
      setIsFinished(true);
      setSelectionModel([]);
    }
  }, [userData?.unfinished_tasks, userData?.finished_tasks]);

  useEffect(() => {
    if (userId) {
      setTabValue(0);
      setIsFinished(false);
    }
  }, [userId]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  if (isLoading) {
    return <LoadingColorRing />;
  }

  return (
    <div>
      <Grid2
        container
        direction="column"
        rowSpacing={1}
        alignContent="center"
        alignItems="center"
        data-testid="users-show-page"
      >
        <Grid2 xs={12}>
          <Stack direction="row" spacing={1} alignItems="center">
            <BackIconButton />
            <UserNameHeader user={userData?.user} />
          </Stack>
        </Grid2>
        <Grid2 xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            {userData?.user?.id === currentUser?.id ? (
              <TasksActionButtons
                selectionModel={selectionModel}
                isFinished={isFinished}
                flag={reloadFlag}
                setFlag={setReloadFlag}
                tabValue={tabValue}
              />
            ) : (
              <br />
            )}
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={tabValue}
                onChange={handleSwitchTasks}
                textColor="inherit"
              >
                <Tab label="未了" {...tabProps(0)} />
                <Tab label="完了済み" {...tabProps(1)} />
                <Tab label="分担履歴" {...tabProps(2)} />
              </Tabs>
            </Box>
          </Stack>
        </Grid2>
        <Grid2
          xs={12}
          sx={{ width: { xs: 330, sm: 560, md: 850, lg: 900, xl: 1050 } }}
        >
          <TabPanel value={tabValue} index={0}>
            {unfinishedTasksDataGrid}
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            {finishedTasksDataGrid}
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            {divisionsDataGrid}
          </TabPanel>
        </Grid2>
      </Grid2>
    </div>
  );
};
