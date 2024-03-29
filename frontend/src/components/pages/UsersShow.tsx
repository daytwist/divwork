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
import { UserActionButtons } from "../models/user/UserActionButtons";
import { AuthContext } from "../../providers/AuthProvider";
import { useFetchUser } from "../../hooks/user/useFetchUser";
import { UserTasksDataGrid } from "../models/user/UserTasksDataGrid";
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
  const [userData, isLoading] = useFetchUser(reloadFlag, "show");

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
            justifyContent="space-between"
            alignItems="flex-end"
            sx={{ flexDirection: { xs: "column", sm: "row" } }}
          >
            {userData?.user?.id === currentUser?.id ? (
              <UserActionButtons
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
            <UserTasksDataGrid
              isFinished={false}
              user={userData?.user}
              tasks={userData?.unfinished_tasks}
              selectionModel={selectionModel}
              setSelectionModel={setSelectionModel}
            />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <UserTasksDataGrid
              isFinished
              user={userData?.user}
              tasks={userData?.finished_tasks}
              selectionModel={selectionModel}
              setSelectionModel={setSelectionModel}
            />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <DivisionsDataGrid divisions={userData?.divisions} />
          </TabPanel>
        </Grid2>
      </Grid2>
    </div>
  );
};
