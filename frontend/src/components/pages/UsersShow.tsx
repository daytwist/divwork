import {
  useContext,
  FC,
  useState,
  SyntheticEvent,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useParams } from "react-router-dom";
import { Box, Stack, Tab, Tabs } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { GridRowId } from "@mui/x-data-grid";
import { TasksActionButtons } from "../models/user/TasksActionButtons";
import { AuthContext } from "../../providers/AuthProvider";
import { useFetchUser } from "../../hooks/useFetchUser";
import { TasksDataGrid } from "../models/user/TasksDataGrid";
import { DivisionsDataGrid } from "../models/user/DivisionsDataGrid";
import { LoadingColorRing } from "../ui/LoadingColorRing";
import { TabPanel } from "../ui/TabPanel";
import { UserNameHeader } from "../models/user/UserNameHeader";
import { BackIconButton } from "../ui/BackIconButton";

const UsersShow: FC = () => {
  const { currentUser } = useContext(AuthContext);
  const urlParams = useParams<{ id: string }>();
  const [flag, setFlag] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [tabValue, setTabValue] = useState(0);
  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);
  const { user, unfinishedTasks, finishedTasks, divisions } = useFetchUser({
    action: "show",
    flag,
  });

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

  const unfinishedTasksDataGrid = useMemo(
    () => (
      <TasksDataGrid
        isFinished={false}
        user={user}
        tasks={unfinishedTasks}
        selectionModel={selectionModel}
        setSelectionModel={setSelectionModel}
      />
    ),
    [unfinishedTasks, selectionModel]
  );

  const finishedTasksDataGrid = useMemo(
    () => (
      <TasksDataGrid
        isFinished
        user={user}
        tasks={finishedTasks}
        selectionModel={selectionModel}
        setSelectionModel={setSelectionModel}
      />
    ),
    [finishedTasks, selectionModel]
  );

  const divisionsDataGrid = useMemo(
    () => <DivisionsDataGrid divisions={divisions} />,
    [divisions, selectionModel]
  );

  useEffect(() => {
    if (unfinishedTasks && tabValue === 0) {
      setIsFinished(false);
      setSelectionModel([]);
    } else if (finishedTasks && tabValue === 1) {
      setIsFinished(true);
      setSelectionModel([]);
    }
  }, [unfinishedTasks, finishedTasks]);

  useEffect(() => {
    if (urlParams) {
      setTabValue(0);
      setIsFinished(false);
    }
  }, [urlParams]);

  return (
    <div>
      {user ? (
        <Grid2
          container
          direction="column"
          rowSpacing={1}
          alignContent="center"
          alignItems="center"
          data-testid="users-show-page"
        >
          <Grid2 xs={12} mb={1}>
            <Stack direction="row" spacing={1} alignItems="center">
              <BackIconButton />
              <UserNameHeader user={user} />
            </Stack>
          </Grid2>
          <Grid2 xs={12}>
            <Stack
              direction="column"
              sx={{ display: { xs: "flex", sm: "none" } }}
            >
              {user?.id === currentUser?.id ? (
                <TasksActionButtons
                  selectionModel={selectionModel}
                  isFinished={isFinished}
                  flag={flag}
                  setFlag={setFlag}
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
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-end"
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              {user?.id === currentUser?.id ? (
                <TasksActionButtons
                  selectionModel={selectionModel}
                  isFinished={isFinished}
                  flag={flag}
                  setFlag={setFlag}
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
      ) : (
        <LoadingColorRing />
      )}
    </div>
  );
};

export default UsersShow;
