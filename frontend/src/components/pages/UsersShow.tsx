/* eslint-disable react/jsx-props-no-spreading */
import {
  useContext,
  FC,
  useState,
  SyntheticEvent,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import { GridRowId } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { AuthContext } from "../../providers/AuthProvider";
import { useFetchUser } from "../../hooks/useFetchUser";
import { AlertDialog } from "../ui/AlertDialog";
import { TasksNewButton } from "../models/task/TasksNewButton";
import { IsDoneUpdateButton } from "../models/task/IsDoneUpdateButton";
import { useHandleMultiTasks } from "../../hooks/useHandleMultiTasks";
import { TasksDataGrid } from "../models/user/TasksDataGrid";
import { DivisionsDataGrid } from "../models/user/DivisionsDataGrid";

type TabPanelProps = {
  children: ReactNode;
  index: number;
  value: number;
};

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const UsersShow: FC = () => {
  const { currentUser } = useContext(AuthContext);
  const urlParams = useParams<{ id: string }>();
  const [flag, setFlag] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [tabValue, setTabValue] = useState(0);
  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);
  const [open, setOpen] = useState(false);
  const { user, unfinishedTasks, finishedTasks, divisions } = useFetchUser({
    action: "show",
    flag,
  });

  const a11yProps = (index: number) => {
    return {
      id: `tab-${index}`,
      "aria-controls": `tabpanel-${index}`,
    };
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { handleMultiIsDoneUpdate, handleMultiTasksDelete } =
    useHandleMultiTasks({
      selectionModel,
      isFinished,
      flag,
      setFlag,
      handleClose,
    });

  const handleSwitchTasks = useCallback(
    (event: SyntheticEvent, newValue: number) => {
      setTabValue(newValue);

      if (newValue === 0) {
        setIsFinished(false);
        setSelectionModel([]);
        console.log("unfinished");
      } else if (newValue === 1) {
        setIsFinished(true);
        setSelectionModel([]);
        console.log("finished");
      } else {
        setSelectionModel([]);
        console.log("divisions");
      }
    },
    []
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
    setTabValue(0);
    setIsFinished(false);
    setSelectionModel([]);
  }, [urlParams]);

  return (
    <div>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Typography variant="h4" component="div" data-testid="users-show-h4">
            {user?.name ? `${user.name}のタスク` : ""}
          </Typography>
        </Grid>
        <Grid item>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {user?.id === currentUser?.id ? (
              <Stack direction="row" spacing={2}>
                <TasksNewButton />
                <IsDoneUpdateButton
                  onClick={handleMultiIsDoneUpdate}
                  disabled={selectionModel?.length === 0}
                  isFinished={isFinished}
                />
                <Button
                  color="error"
                  variant="outlined"
                  onClick={handleClickOpen}
                  disabled={selectionModel?.length === 0}
                  startIcon={<DeleteIcon />}
                >
                  削除する
                </Button>
                <AlertDialog
                  open={open}
                  handleClose={handleClose}
                  objectName="タスク"
                  onClick={handleMultiTasksDelete}
                />
              </Stack>
            ) : (
              <br />
            )}
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={tabValue}
                onChange={handleSwitchTasks}
                textColor="inherit"
              >
                <Tab label="未了" {...a11yProps(0)} />
                <Tab label="完了済み" {...a11yProps(1)} />
                <Tab label="分担履歴" {...a11yProps(2)} />
              </Tabs>
            </Box>
          </Stack>
        </Grid>
        <TabPanel value={tabValue} index={0}>
          <Grid item sx={{ width: { xs: 300, sm: 550, md: 710, lg: 1000 } }}>
            <TasksDataGrid
              isFinished={false}
              user={user}
              tasks={unfinishedTasks}
              selectionModel={selectionModel}
              setSelectionModel={setSelectionModel}
            />
          </Grid>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Grid item sx={{ width: { xs: 300, sm: 550, md: 710, lg: 1000 } }}>
            <TasksDataGrid
              isFinished
              user={user}
              tasks={finishedTasks}
              selectionModel={selectionModel}
              setSelectionModel={setSelectionModel}
            />
          </Grid>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Grid item sx={{ width: { xs: 300, sm: 550, md: 710, lg: 1000 } }}>
            <DivisionsDataGrid
              user={user}
              divisions={divisions}
              selectionModel={selectionModel}
              setSelectionModel={setSelectionModel}
            />
          </Grid>
        </TabPanel>
      </Grid>
    </div>
  );
};

export default UsersShow;
