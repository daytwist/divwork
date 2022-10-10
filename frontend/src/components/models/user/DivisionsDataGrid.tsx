/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Link as RouterLink } from "react-router-dom";
import { Link, Avatar, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DivisionHistory } from "../../../types/divisionTypes";
import { DatetimeFormat } from "../../ui/DatetimeFormat";

type Props = {
  divisions: DivisionHistory[];
};

export const DivisionsDataGrid = (props: Props) => {
  const { divisions } = props;

  const rows = divisions.map((division) => ({
    id: division.id,
    parent_task_id: division.parent_task ? division.parent_task.id : undefined,
    parent_task_title: division.parent_task
      ? division.parent_task.title
      : "削除済みタスク",
    parent_user_id: division.parent_user ? division.parent_user.id : undefined,
    parent_user_avatar: division.parent_user_avatar,
    parent_user_name: division.parent_user
      ? division.parent_user.name
      : "退会済みユーザー",
    child_task_id: division.child_task ? division.child_task.id : undefined,
    child_task_title: division.child_task
      ? division.child_task.title
      : "削除済みタスク",
    child_user_id: division.child_user ? division.child_user.id : undefined,
    child_user_avatar: division.child_user_avatar,
    child_user_name: division.child_user
      ? division.child_user.name
      : "退会済みユーザー",
    comment: division.comment,
    created_at: DatetimeFormat(division.created_at),
  }));

  const columns: GridColDef[] = [
    { field: "created_at", headerName: "分担作成日", width: 150 },
    {
      field: "parent_user_name",
      headerName: "分担元ユーザー",
      width: 150,
      renderCell: (params) =>
        params.row.parent_user_id ? (
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar
              src={params.row.parent_user_avatar}
              alt="avatar"
              component={RouterLink}
              to={`/users/${params.row.parent_user_id}`}
              sx={{ width: 28, height: 28 }}
            />
            <Link
              color="inherit"
              underline="hover"
              component={RouterLink}
              to={`/users/${params.row.parent_user_id}`}
            >
              {params.value}
            </Link>
          </Stack>
        ) : (
          <Typography variant="body2" component="div">
            {params.value}
          </Typography>
        ),
    },
    {
      field: "parent_task_title",
      headerName: "分担元タスク",
      width: 160,
      renderCell: (params) =>
        params.row.parent_task_id ? (
          <Link
            color="inherit"
            underline="hover"
            component={RouterLink}
            to={`/tasks/${params.row.parent_task_id}`}
          >
            {params.value}
          </Link>
        ) : (
          <Typography variant="body2" component="div">
            {params.value}
          </Typography>
        ),
    },
    {
      field: "child_user_name",
      headerName: "分担先ユーザー",
      width: 150,
      renderCell: (params) =>
        params.row.child_user_id ? (
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar
              src={params.row.child_user_avatar}
              alt="avatar"
              component={RouterLink}
              to={`/users/${params.row.child_user_id}`}
              sx={{ width: 28, height: 28 }}
            />
            <Link
              color="inherit"
              underline="hover"
              component={RouterLink}
              to={`/users/${params.row.child_user_id}`}
            >
              {params.value}
            </Link>
          </Stack>
        ) : (
          <Typography variant="body2" component="div">
            {params.value}
          </Typography>
        ),
    },
    {
      field: "child_task_title",
      headerName: "分担先タスク",
      width: 160,
      renderCell: (params) =>
        params.row.child_task_id ? (
          <Link
            color="inherit"
            underline="hover"
            component={RouterLink}
            to={`/tasks/${params.row.child_task_id}`}
          >
            {params.value}
          </Link>
        ) : (
          <Typography variant="body2" component="div">
            {params.value}
          </Typography>
        ),
    },
    { field: "comment", headerName: "コメント", width: 150 },
  ];

  return (
    <div style={{ height: 430, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </div>
  );
};
