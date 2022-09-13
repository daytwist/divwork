/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Dispatch, SetStateAction, useContext } from "react";
import { Link } from "react-router-dom";
import { DataGrid, GridRowId, GridColDef } from "@mui/x-data-grid";
import { DivisionDetails, User } from "../../../types";
import { DatetimeFormat } from "../../ui/DatetimeFormat";
import { AuthContext } from "../../../providers/AuthProvider";

type Props = {
  user: User | undefined;
  divisions: DivisionDetails[];
  selectionModel: GridRowId[];
  setSelectionModel: Dispatch<SetStateAction<GridRowId[]>>;
};

export const DivisionsDataGrid = (props: Props) => {
  const { user, divisions, selectionModel, setSelectionModel } = props;
  const { currentUser } = useContext(AuthContext);

  const rows = divisions.map((division) => ({
    id: division.id,
    parent_task_id: division.details.parent_task_id,
    parent_task_title: division.details.parent_task_title,
    parent_user_id: division.details.parent_user_id,
    parent_user_name: division.details.parent_user_name,
    child_task_id: division.details.child_task_id,
    child_task_title: division.details.child_task_title,
    child_user_id: division.details.child_user_id,
    child_user_name: division.details.child_user_name,
    comment: division.comment,
    created_at: DatetimeFormat(division.created_at),
  }));

  const columns: GridColDef[] = [
    {
      field: "parent_task_title",
      headerName: "分担元タスク",
      width: 180,
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
      field: "parent_user_name",
      headerName: "分担元ユーザー",
      width: 150,
      renderCell: (params) => (
        <Link
          to={`/tasks/${params.row.parent_user_id}`}
          style={{ color: "black" }}
        >
          {params.value}
        </Link>
      ),
    },
    {
      field: "child_task_title",
      headerName: "分担先タスク",
      width: 180,
      renderCell: (params) => (
        <Link
          to={`/tasks/${params.row.child_task_id}`}
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
          to={`/tasks/${params.row.child_user_id}`}
          style={{ color: "black" }}
        >
          {params.value}
        </Link>
      ),
    },
    { field: "created_at", headerName: "作成日", width: 150 },
    { field: "comment", headerName: "コメント", width: 150 },
  ];

  return (
    <div style={{ height: 430, width: "100%" }}>
      {user?.id === currentUser?.id ? (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          selectionModel={selectionModel}
          onSelectionModelChange={(newSelectionModel) =>
            setSelectionModel(newSelectionModel)
          }
        />
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
        />
      )}
    </div>
  );
};
