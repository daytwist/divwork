import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Chip, Stack, IconButton, Link, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import { TasksDeleteIconButton } from "../task/TasksDeleteIconButton";
import { PriorityChipProps } from "./PriorityChipProps";
import { AuthContext } from "../../../providers/AuthProvider";
import { User } from "../../../types/userTypes";

export const FinishedTasksColumns = (user: User | undefined) => {
  const { currentUser } = useContext(AuthContext);

  const finishedTasksColumns: GridColDef[] = [
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
    { field: "deadline", headerName: "納期", width: 150 },
    { field: "updated_at", headerName: "完了日", width: 150 },
    {
      field: "actions",
      headerName: "アクション",
      width: 100,
      renderCell: (params) =>
        user?.id === currentUser?.id ? (
          <Stack direction="row" spacing={1}>
            <Tooltip title="編集" placement="top" arrow>
              <IconButton
                component={RouterLink}
                to={`/tasks/${params.id}/edit`}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <TasksDeleteIconButton taskId={params.id} />
          </Stack>
        ) : null,
      sortable: false,
      disableColumnMenu: true,
    },
  ];

  return finishedTasksColumns;
};
