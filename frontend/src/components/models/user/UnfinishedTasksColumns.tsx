import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Chip, Stack, IconButton, Link, Tooltip } from "@mui/material";
import { GridColDef, GridCellParams } from "@mui/x-data-grid";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import EditIcon from "@mui/icons-material/Edit";
import clsx from "clsx";
import { TasksDeleteIconButton } from "../task/TasksDeleteIconButton";
import { PriorityChipProps } from "./PriorityChipProps";
import { AuthContext } from "../../../providers/AuthProvider";
import { User } from "../../../types/userTypes";

export const UnfinishedTasksColumns = (user: User | undefined) => {
  const { currentUser } = useContext(AuthContext);

  const unfinishedTasksColumns: GridColDef[] = [
    {
      field: "title",
      headerName: "タイトル",
      width: 200,
      renderCell: (params) => (
        <Link
          color="inherit"
          underline="hover"
          component={RouterLink}
          to={`/tasks/${params.id}`}
        >
          {params.value}
        </Link>
      ),
    },
    { field: "description", headerName: "詳細", width: 200 },
    {
      field: "priority",
      headerName: "重要度",
      width: 100,
      renderCell: (params) => (
        <Chip
          variant="outlined"
          sx={{ height: 28 }}
          {...PriorityChipProps(params)}
        />
      ),
    },
    {
      field: "deadline",
      headerName: "納期",
      width: 150,
      cellClassName: (params: GridCellParams<string>) => {
        if (params.value === undefined) {
          return "";
        }
        return clsx("deadline", {
          over: new Date(params.value.toString()) < new Date(),
        });
      },
    },
    { field: "rateOfProgress", headerName: "進捗率", width: 100 },
    {
      field: "actions",
      headerName: "アクション",
      width: 150,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="分担する" placement="top" arrow>
            <IconButton
              color="secondary"
              component={RouterLink}
              to={`/tasks/${params.id}/divisions/new`}
            >
              <ConnectWithoutContactIcon />
            </IconButton>
          </Tooltip>
          {user?.id === currentUser?.id ? (
            <>
              <Tooltip title="編集" placement="top" arrow>
                <IconButton
                  component={RouterLink}
                  to={`/tasks/${params.id}/edit`}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <TasksDeleteIconButton taskId={params.id} />
            </>
          ) : null}
        </Stack>
      ),
      sortable: false,
      disableColumnMenu: true,
    },
  ];

  return unfinishedTasksColumns;
};
