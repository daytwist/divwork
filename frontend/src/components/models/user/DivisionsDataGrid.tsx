/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Link } from "react-router-dom";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DivisionHistory } from "../../../types";
import { DatetimeFormat } from "../../ui/DatetimeFormat";

type Props = {
  divisions: DivisionHistory[];
};

export const DivisionsDataGrid = (props: Props) => {
  const { divisions } = props;

  const rows = divisions.map((division) => ({
    id: division.id,
    parent_task_id: division.parent_task.id,
    parent_task_title: division.parent_task.title,
    parent_user_id: division.parent_user.id,
    parent_user_name: division.parent_user.name,
    parent_user_avatar: division.parent_user_avatar,
    child_task_id: division.child_task.id,
    child_task_title: division.child_task.title,
    child_user_id: division.child_user.id,
    child_user_avatar: division.child_user_avatar,
    child_user_name: division.child_user.name,
    comment: division.comment,
    created_at: DatetimeFormat(division.created_at),
  }));

  const columns: GridColDef[] = [
    { field: "created_at", headerName: "分担作成日", width: 150 },
    {
      field: "parent_user_name",
      headerName: "分担元ユーザー",
      width: 150,
      renderCell: (params) => (
        <Link
          to={`/users/${params.row.parent_user_id}`}
          style={{ textDecoration: "none" }}
        >
          <Stack direction="row" component={Button} alignItems="center">
            <Avatar
              src={params.row.parent_user_avatar}
              alt="avatar"
              sx={{ width: 28, height: 28, mr: 1 }}
            />
            <Typography
              variant="button"
              component="div"
              sx={{ color: "black" }}
            >
              {params.value}
            </Typography>
          </Stack>
        </Link>
      ),
    },
    {
      field: "parent_task_title",
      headerName: "分担元タスク",
      width: 160,
      renderCell: (params) => (
        <Link
          to={`/tasks/${params.row.parent_task_id}`}
          style={{ color: "black" }}
        >
          {params.value}
        </Link>
      ),
    },
    {
      field: "child_user_name",
      headerName: "分担先ユーザー",
      width: 150,
      renderCell: (params) => (
        <Link
          to={`/users/${params.row.child_user_id}`}
          style={{ textDecoration: "none" }}
        >
          <Stack direction="row" component={Button} alignItems="center">
            <Avatar
              src={params.row.child_user_avatar}
              alt="avatar"
              sx={{ width: 28, height: 28, mr: 1 }}
            />
            <Typography
              variant="button"
              component="div"
              sx={{ color: "black" }}
            >
              {params.value}
            </Typography>
          </Stack>
        </Link>
      ),
    },
    {
      field: "child_task_title",
      headerName: "分担先タスク",
      width: 160,
      renderCell: (params) => (
        <Link
          to={`/tasks/${params.row.child_task_id}`}
          style={{ color: "black" }}
        >
          {params.value}
        </Link>
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
        initialState={{
          sorting: {
            sortModel: [{ field: "created_at", sort: "desc" }],
          },
        }}
      />
    </div>
  );
};
