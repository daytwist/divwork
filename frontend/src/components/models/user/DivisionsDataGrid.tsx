import { Dispatch, SetStateAction, useContext } from "react";
import { DataGrid, GridRowId } from "@mui/x-data-grid";
import { Division, User } from "../../../types";
import { DatetimeFormat } from "../../ui/DatetimeFormat";
import { AuthContext } from "../../../providers/AuthProvider";

type Props = {
  user: User | undefined;
  divisions: Division[];
  selectionModel: GridRowId[];
  setSelectionModel: Dispatch<SetStateAction<GridRowId[]>>;
};

export const DivisionsDataGrid = (props: Props) => {
  const { user, divisions, selectionModel, setSelectionModel } = props;
  const { currentUser } = useContext(AuthContext);

  const rows = divisions.map((division) => ({
    id: division.id,
    created_at: DatetimeFormat(division.created_at),
  }));

  const columns = [{ field: "created_at", headerName: "作成日", width: 150 }];

  return (
    <div style={{ height: 400, width: "100%" }}>
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
